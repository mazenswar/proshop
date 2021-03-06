import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, getUsers } from '../actions/userActions';
import { Button, Table } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

function UserListScreen({history}) {
  const {loading, error, users} = useSelector(state => state.userList)
  const {userInfo} = useSelector(state => state.userLogin)
  const {success: successDelete } = useSelector(state => state.userDelete)
  const dispatch = useDispatch();
  console.log(successDelete)
  useEffect(()=>{
    if(userInfo && userInfo.isAdmin) {
      dispatch(getUsers())
    } else {
      history.push('/login')
    }
  }, [history, dispatch, userInfo, successDelete])

  const deleteHandler = id => {
    if(window.confirm('Are you sure you want to delete this user?')){
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h1>Users</h1> 
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? <i className="fas fa-check" style={{color: 'green'}}></i> : <i className="fas fa-times" style={{color: 'red'}}></i>}
                </td>
                <td>
                  <LinkContainer to={`/users/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button variant="danger" className="btn-sm" onClick={()=> deleteHandler(user._id)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </Table>
        )}
    </>
  )
}

export default UserListScreen
