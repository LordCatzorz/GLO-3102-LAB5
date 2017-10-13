export function CreateNewUserASync() {
  let myRequest = new Request("https://glo3102lab4.herokuapp.com/users", {method: "POST"});

  return fetch(myRequest).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw response;
    }
  }).then((theData) => {
    return theData["id"];
  }).catch((error) => {
    handleFetchError(error);
  });
}

export function GetUserTasksASync(id_user) {
  let myRequest = new Request("https://glo3102lab4.herokuapp.com/" + id_user + "/tasks", {
    method: "GET"
  });
  return fetch(myRequest).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw response;
    }
  }).then((theData) => {
    return theData.tasks;
  }).catch((error) => {
    handleFetchError(error);
  })
}

export function CreateNewTaskAsync(id_user, newTaskName) {
  if (newTaskName !== '' && newTaskName !== undefined && typeof(newTaskName) === typeof('')) {
    let jsonTask = JSON.stringify({name: newTaskName});

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let myRequest = new Request("https://glo3102lab4.herokuapp.com/" + id_user + "/tasks", {
      method: "POST",
      headers: headers,
      body: jsonTask
    });

    return fetch(myRequest).then((response) => {
      if (response.ok) {
        return response;
      } else {
        throw response
      }
    }).catch((error) => {
      handleFetchError(error);
    });
  } else {
    handleValidationError('CreateNewTaskAsync: newTaskName must be a valid non empty string. \nReceived: ' + newTaskName);
  }
}

export function EditTaskASync(id_user, id_task, newName) {
  if (newName !== '' && newName !== undefined && typeof(newName) === typeof('')) {
    let jsonTask = JSON.stringify({name: newName});

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let myRequest = new Request("https://glo3102lab4.herokuapp.com/" + id_user + "/tasks/" + id_task, {
      method: "PUT",
      headers: headers,
      body: jsonTask
    });

    return fetch(myRequest).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).catch((error) => {
      handleFetchError(error)
    })
  } else {
    handleValidationError('EditTaskASync: newName must be a valid non empty string. \nReceived: ' + newName);
  }
}

export function DeleteTaskASync(id_user, id_task) {
  let myRequest = new Request("https://glo3102lab4.herokuapp.com/" + id_user + "/tasks/" + id_task, {
    method: "DELETE"
  });

  return fetch(myRequest);
}

function handleFetchError(error) {
  alert('Error. Error. Error.\n' +
    error.status + ' - ' + error.statusText + '\n' +
    'url:' + error.url);
}

function handleValidationError(error) {
  alert('Error. Error. Error.\n' +
    'A validation as failed:\n' +
    error);
}
