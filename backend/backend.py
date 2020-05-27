#imports for the flask_functionality
from flask import Flask, jsonify, request
from flask_cors import CORS
#imports for pymongo data managment
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from datetime import date,datetime,timedelta

#configs and wrappers for flask app 
app = Flask(__name__)
app.config['MONGO_URI']="mongodb://0.0.0.0:27017/garten"
app.config['DEBUG']=True
CORS(app)
mongo = PyMongo(app)


#Initialise collection classes to query and add data for the collections
usersCollection = mongo.db.users
objectsCollection = mongo.db.objects
todosCollection = mongo.db.todos
#citiesCollection = mongo.db.cities


"""
User Managment and Info
"""
#check if a user exits
@app.route('/user/<email>/exists',methods=['GET'])
def check_if_user_exists(email):
    user = usersCollection.find_one({"email":email})
    res = False
    if user is not None:
        res = True
    return jsonify(res)

@app.route('/user/<email>/info',methods=['GET'])
def get_basic_user_infos(email):
    user = usersCollection.find_one({"email":email})
    dataOutput={}
    if user is not None:
        dataOutput['city']=user['city']
        dataOutput['name']=user['name']
        dataOutput['lvl']=user['lvl']
        dataOutput['seeds']=user['seeds']
        dataOutput['points']=user['points']
        return jsonify({"info":dataOutput})
    return jsonify({"error":"User with email {0} does not exist".format(email)}),200

#get the basic user infos
@app.route('/user/<email>/overview',methods=['GET'])
def get_user_overview(email):
    user = usersCollection.find_one({"email":email})
    if user is not None:
        user['_id']=str(user['_id'])
        return jsonify(user)
    return jsonify({"error":"User with email {0} does not exist".format(email)}),200

#check the friends of the user
@app.route('/user/<email>/friends',methods=['GET'])
def get_friends_of_user(email):
    user = usersCollection.find_one({"email":email})
    if user is None:
        return jsonify({"error":"User with email {0} does not exist".format(email)}),200
    friends = user['friends']
    output = []
    for friend in friends:
        friendInfo = usersCollection.find_one({"email":friend})
        if friendInfo is not None:
            tempRes = {}
            tempRes['name']=friendInfo['name']
            tempRes['email']=friendInfo['email']
            tempRes['lvl']=friendInfo['lvl']
            tempRes['city']=friendInfo['city']
            output.append(tempRes)
    return jsonify({"result":output})

#Get the todos of a user
@app.route('/user/<email>/todos',methods=['GET'])
def get_todos_for_user(email):
    user = usersCollection.find_one({"email":email})
    if user is None:
        return jsonify({}),200
    todo_ids = user['todos']
    output = []
    for todo_id in todo_ids:
        todo = todosCollection.find_one({"_id":ObjectId(todo_id)})
        if todo is not None:
            todo['_id']=str(todo['_id'])
            output.append(todo)
    return jsonify({"todos":output})

#get the done todos
@app.route('/user/<email>/donetodos',methods=['GET'])
def get_done_todos_for_user(email):
    user = usersCollection.find_one({"email":email})
    if user is None:
        return jsonify({}),200
    todo_ids = user['todos_done']
    output = []
    for todo_id in todo_ids:
        todo = todosCollection.find_one({"_id":ObjectId(todo_id)})
        if todo is not None:
            todo['_id']=str(todo['_id'])
            output.append(todo)
    return jsonify({"todos":output})

#Get the inventory for the User
@app.route('/user/<email>/inventory',methods=['GET'])
def get_inventory_for_user(email):
    user = usersCollection.find_one({"email":email})
    if user is None:
        return jsonify({}),200
    object_ids = user['inventory']
    output = []
    count = {}
    #count the number of items in the inventory
    for obj in object_ids:
        if(obj in count):
            count[obj] += 1
        else:
            count[obj] =1
    #return number and object name
    for key,value in count.items():
        temp = {}
        temp['count'] = value 
        temp['_id'] = key
        #lookup name from object
        tmpObj = objectsCollection.find_one({"_id":ObjectId(key)})
        temp['name']=tmpObj['name']
        output.append(temp)
    return jsonify({"inventory":output})

#register a new user
@app.route('/user/register', methods=['POST'])
def register_user():
    dataRequest = {}
    try:
        dataRequest = request.get_json(force=True)
    except :
        return jsonify({'error':'Payload is not a valid json object'}),400
    dataInsert = {}
    dataInsert['email']=dataRequest['email']
    dataInsert['name']=dataRequest['name']
    dataInsert['city']=dataRequest['city']
    dataInsert['lvl']=1
    dataInsert['seeds']=10
    dataInsert['points']=0
    dataInsert['friends']=[]
    dataInsert['garden']=[]
    dataInsert['todos']=[]
    dataInsert['habits']=[]
    dataInsert['inventory']=[]
    dataInsert['todos_done']=[]
    user = usersCollection.insert_one(dataInsert)
    return jsonify({'result':"User was created with the id {0}".format(str(user.inserted_id))})

#Add a friend for a user
@app.route('/user/friends',methods=['POST'])
def add_user_as_friend():
    dataRequest = {}
    try:
        dataRequest = request.get_json(force=True)
    except :
        return jsonify({'error':'Payload is not a valid json object'}),400
    usersCollection.update_one({"email":dataRequest['email']},{"$addToSet":{'friends':dataRequest['friend']}})
    return jsonify({"message":"{0} successfully added {1} as a friend".format(dataRequest['email'],dataRequest['friend'])})

#add a todo for user
@app.route('/user/todos',methods=['POST'])
def add_todo_to_a_user():
    dataRequest = {}
    try:
        dataRequest = request.get_json(force=True)
    except :
        return jsonify({'error':'Payload is not a valid json object'}),400
    usersCollection.update_one({"email":dataRequest['email']},{"$addToSet":{'todos':dataRequest['todo_id']}})
    return jsonify({"message":"{0} successfully added todo with id {1}".format(dataRequest['email'],dataRequest['todo_id'])})


"""
Garden Management
"""
#place a plant in the gareden
@app.route('/garden/place',methods=['POST'])
def place_a_plant():
    dataRequest = {}
    try:
        dataRequest = request.get_json(force=True)
    except :
        return jsonify({'error':'Payload is not a valid json object'}),400
    #check if the user has the plant
    user = usersCollection.find_one({"email":dataRequest['email']})
    inventory = user['inventory']
    if dataRequest['plant_id'] not in inventory:
        return jsonify({"error":"User does not has the plant"}),200
    #check if the user can place something on the field
    if check_if_field_is_empty(str(user['_id']),x=dataRequest['x'],y=dataRequest['y']) == False:
        return jsonify({"error":"The given Field is not free"}),200
    #place plant
    newPlant = (dataRequest['plant_id'],dataRequest['x'],dataRequest['y'])
    usersCollection.update_one({"email":dataRequest['email']}
                              ,{"$push":{"garden":list(newPlant)}})
    #remove from inventory of user 
    usersCollection.update_one({"email":dataRequest['email']}
                              ,{"$pull":{"inventory":dataRequest['plant_id']}})
    return({"message":"jo passt"})
    
    
"""
Object/Shop Management
"""
#get all items in for the shop
@app.route('/object/shop',methods=['GET'])
def get_shop_items():
    output=[]
    for item in objectsCollection.find():
        item['_id']=str(item['_id'])
        output.append(item)
    return jsonify({"result":output})

#user buys something
@app.route('/object/buy',methods=['POST'])
def buy_item():
    dataRequest = {}
    try:
        dataRequest = request.get_json(force=True)
    except :
        return jsonify({'error':'Payload is not a valid json object'}),400
    user = usersCollection.find_one({"email":dataRequest["email"]})
    item = objectsCollection.find_one({"_id":ObjectId(dataRequest['_id'])})
    if user is None or item is None:
        return jsonify({"error":"User or Item does not exist"}),400
    newBalance = user['seeds'] - item ['price']
    if newBalance < 0:
        return jsonify({"error":"Sorry, you are broke "}),400
    usersCollection.update_one({"email":dataRequest['email']}
        ,{"$set":{"seeds":newBalance},
        "$push":{"inventory":str(item['_id'])}})
    return jsonify({"message":"Have fun with your new item"}) 

"""
TodoManagement
"""
#get all todos
@app.route('/todos/all',methods=['GET'])
def get_all_todos():
    output = []
    for todo in todosCollection.find({"owntodo":False}):
        todo['_id']=str(todo['_id'])
        output.append(todo)
    return jsonify({"todos":output})


#create a new Todo and map to User
@app.route('/todos/own',methods=['POST'])
def create_own_todo_for_user():
    dataRequest = {}
    try:
        dataRequest = request.get_json(force=True)
    except :
        return jsonify({'error':'Payload is not a valid json object'}),400
    dataInsert={}
    dataInsert['name']=dataRequest['name']
    dataInsert['description']=dataRequest['description']
    dataInsert['difficulty']=int(dataRequest['difficulty'])
    dataInsert['seeds']= int(dataRequest['difficulty'])*10
    dataInsert['created_by']=dataRequest['email']
    dataInsert['owntodo']=True
    todo = todosCollection.insert_one(dataInsert)
    usersCollection.update_one({"email":dataRequest['email']},{"$addToSet":{'todos':str(todo.inserted_id)}})
    return jsonify({"message":"Jo passt"})

#mark a todo as done
@app.route('/todos/check',methods=['POST'])
def complete_todo():
    dataRequest = {}
    try:
        dataRequest = request.get_json(force=True)
    except :
        return jsonify({'error':'Payload is not a valid json object'}),400
    dataRequest['email']
    dataRequest['todo_id']
    #get the todo
    todo = todosCollection.find_one({"_id":ObjectId(dataRequest['todo_id'])})
    if todo is None:
        return jsonify({})
    seeds = todo['seeds']
    todoName = todo['name']
    points = todo['difficulty']
    #remove the todo from todos and add to done todos
    user = usersCollection.find_one({"email":dataRequest['email']})
    if user is None:
        return jsonify({})
    
    points_needed_to_upgrade = user['lvl'] * 10
    newPoints = user['points'] + points

    #If the user reaches a new level, upgrade and reset the points
    if newPoints > points_needed_to_upgrade:
        usersCollection.update_one({"email":dataRequest},{"$inc":{"lvl":1}})
        newPoints = newPoints - points_needed_to_upgrade
    
    #Mark Todo as done
    #set new points
    #reward user with seeds
    usersCollection.update_one({"email":dataRequest['email']},
        {"$pull":{"todos":dataRequest['todo_id']},
        "$push":{"todos_done":dataRequest['todo_id']},
        "$set":{"points": newPoints},
        "$inc":{"seeds":seeds}})
    return jsonify({"message":"Todo {0} is marked as done".format(todoName)})
    
    

"""
Admin Routes for Creating special Stuff
Require as param user=admin, password=nimda
"""
#add a new object to the shop
@app.route('/object/shop/new',methods=['POST'])
def create_new_object_in_shop():
    dataRequest = {}
    try:
        dataRequest = request.get_json(force=True)
    except :
        return jsonify({'error':'Payload is not a valid json object'}),400
    if not (dataRequest['password']=="nimda" or dataRequest['user']=="admin"):
        return jsonify({}),405
    dataInsert = {}
    dataInsert['name']=dataRequest['name']
    dataInsert['price']=int(dataRequest['price'])
    dataInsert['unlockableAtLvl']=int(dataRequest['unlockableAtLvl'])
    if objectsCollection.find_one({"name":dataInsert['name']}) is not None:
        return({"message":"object already exists"})
    obj = objectsCollection.insert_one(dataInsert)
    return jsonify({"message":"Object in the shop was created with ID {0}".format(str(obj.inserted_id))})

#add a global todo
@app.route('/todos/global',methods=['POST'])
def create_global_todo():
    dataRequest = {}
    try:
        dataRequest = request.get_json(force=True)
    except :
        return jsonify({'error':'Payload is not a valid json object'}),400
    if not (dataRequest['password']=="nimda" or dataRequest['user']=="admin"):
        return jsonify({}),405
    dataInsert={}
    dataInsert['name']=dataRequest['name']
    dataInsert['description']=dataRequest['description']
    dataInsert['difficulty']=int(dataRequest['difficulty'])
    dataInsert['owntodo']=False
    if (dataRequest['seeds']):
        dataInsert['seeds']=int(dataRequest['seeds'])
    else:
        dataInsert['seeds']= dataInsert['difficulty']*10
    

"""
Helper Methods 
"""
def check_if_field_is_empty(userId,x,y):
    user = usersCollection.find_one({"_id":ObjectId(userId)})
    #Check if user exists
    if user is None:
        return False
    dimension = user['lvl']
    #check if user has unlocked such a big field
    if x > dimension or y > dimension:
        return False
    #check if field is free
    #compare with each object, which is already placed in the garden
    gardenColl = user['garden']
    for garden in gardenColl:
        x_counterpart = garden[1]
        y_counterpart = garden[2]
        if x == x_counterpart and y == y_counterpart:
            return False
    return True

#Make Script executable
if __name__ == "__main__":
    app.run(port=5000)