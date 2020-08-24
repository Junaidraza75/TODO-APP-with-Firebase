
var list =document.getElementById("list");

firebase.database().ref('todos').on('child_added',function(data){
       
    var li=document.createElement('li')
    var liText=document.createTextNode(data.val().value)
    li.appendChild(liText)
    
    // // editButton 
    var editbtn=document.createElement('button')
    var editTxt=document.createTextNode("Edit")
    editbtn.appendChild(editTxt)
    editbtn.setAttribute("class","btnedit")
    editbtn.setAttribute('id',data.val().key)
    editbtn.setAttribute("onclick", "editItem(this)")
    li.appendChild(editbtn)
    
    //     // deleteButton 
    var delbtn=document.createElement('button')
    var deltext=document.createTextNode("Delete")
    delbtn.setAttribute("class","btndel")
    delbtn.setAttribute('id',data.val().key)
    delbtn.setAttribute("onclick", "deleteItem(this)")
    delbtn.appendChild(deltext)

    li.appendChild(delbtn)
    list.appendChild(li)

})


function addtodo(){
    // Li Task With text Node
    var todo_item = document.getElementById("todo-item")
    
    var database= firebase.database().ref('todos')

    var key =database.push().key;
    var todo={
        value: todo_item.value,
        key: key
    }
    database.child(key).set(todo)
    todo_item.value=""


}

function delall(){
    firebase.database().ref('todos').remove()
    list.innerHTML=""

}
function deleteItem(j) {

    firebase.database().ref('todos').child(j.id).remove()
    console.log(j.id)
    j.parentNode.remove()    
    // console.log(j.parentNode)    
}
function editItem(e){

    var val=prompt("Enter Edit Value",e.parentNode.firstChild.nodeValue)
    var editTodo={
        value: val,
        key: e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = val;
}
