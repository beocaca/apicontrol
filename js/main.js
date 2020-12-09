setColor = () => {
  var colorInput = document.getElementById('color')
  color = colorInput.value
  var table = document.getElementById('list')
  table.bgColor = color
}

addUser = (user) => {
  var idInput = user.id;
  var createdAtInput = user.createdAt;
  var nameInput = user.name;
  var avartarInput = user.avatar;

  var tableList = document.getElementById('list')
  var tdId = document.createElement('td')
  var tdCreat = document.createElement('td')
  var tdName = document.createElement('td')
  var tdAvatar = document.createElement('td')
  tdId.textContent = idInput
  tdCreat.textContent = createdAtInput
  tdName.textContent = nameInput
  tdAvatar.textContent = avartarInput

  var tr = document.createElement('tr')
  tr.appendChild(tdId)
  tr.appendChild(tdCreat)
  tr.appendChild(tdName)
  tr.appendChild(tdAvatar)

  var tdCommands = document.createElement('td')
  var editButton = document.createElement('button')
  var removeButton = document.createElement('button')


  editButton.textContent = "Edit"
  editButton.onclick = (e) => {
    editName(idInput, e)
  }
  removeButton.textContent = "Remove"
  removeButton.onclick = (e) => {
    removeUser(idInput, e)
  }

  tdCommands.appendChild(editButton)
  tdCommands.appendChild(removeButton)
  tr.appendChild(tdCommands)

  var newTr = colorTable(tableList, tr)

  tableList.appendChild(newTr)
}
colorTable = (tableDOM, trDOM) => {
  var trList = tableDOM.getElementsByTagName('tr')
  var lastTr = trList[trList.length - 1]
  if (lastTr.className === "even") {
    trDOM.className = "odd"
  } else {
    trDOM.className = "even"
  }
  return trDOM
}


validateName = (name) => {
  if (!name || !name.trim() || name.trim().length < 3) {
    alert("Invalid Name")
    return false;
  }
  return name;
}


removeUser = (id, e) => {
  if (!window.confirm('Delete your user ?')) {
    return
  }
  request(
    'DELETE',
    "https://5fb3f39db6601200168f817f.mockapi.io/users/" + id,
    null,
    function () {
      e.target.parentElement.parentElement.remove()
      console.log(this)
    },
    e.target
  )
}


editName = (id, e) => {
  var indexName = e.target.parentElement.previousElementSibling.previousElementSibling
  var oldName = indexName.textContent
  var newName = window.validateName(prompt('Enter your name :', oldName))
  if (!newName) {
    return
  }
  request(
    'PUT',
    "https://5fb3f39db6601200168f817f.mockapi.io/users/" + id,
    JSON.stringify({name: newName}),
    function (response) {
      //debugger;
      var oldName = e.target.parentElement.previousElementSibling.previousElementSibling
      oldName.textContent = newName
      //alert('Done')
      //console.log(this)

    },
    e.target
  )
  console.log(e)
}


newUser = (e) => {
  newName = window.validateName(prompt('Your new name is :'))
  if (!newName) {
    return
  }
  request(
    'POST',
    "https://5fb3f39db6601200168f817f.mockapi.io/users/",
    (JSON.stringify({name: newName})),
    function (response) {
      newObj = JSON.parse(response)
      addUser(newObj)
      //console.log(this);
      console.log(response)
    },
    e.target
  )
  console.log(e)
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


request = (method, url, body, callback, target) => {
  var img;

  if (target) {
    target.style.display = "none"
    img = document.createElement("img")
    img.src = "/ajax-loader.7234ad42.gif"
    insertAfter(target, img);
  }

  var xmlhttp = new XMLHttpRequest()
  //xmlhttp.onreadystatechange = callback;
  xmlhttp.onload = function () {
    if (target) {
      target.style.display = ""
      img.remove()
    }
    console.log(this)
    //debugger;
    callback(this.response)
  }
  xmlhttp.open(method, url)
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(body)
}


window.onload = function () {
  request(
    'GET',
    "https://5fb3f39db6601200168f817f.mockapi.io/users/",
    null,
    function (response) {
      users = response;
      newObj = JSON.parse(users)
      newObj.forEach(user => addUser(user));
      // console.log(response)
    }
  )
}






