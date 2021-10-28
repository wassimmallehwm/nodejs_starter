import React, { useState, useEffect, useContext } from 'react'
import { findAll, findOne, removeUser, addOrUpdateUser } from '../users.service'
import { Datatable } from 'react-semantic-ui-datatable';
import Loader from '../../../../shared/components/Loader';
import moment from 'moment';
// import NoData from '../NoData';
import { AuthContext } from '../../../../contexts/AuthContext';
import { userImage } from '../../../../utils/file-path/imagePath';
import Button from '../../../../shared/components/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Confirmation from '../../../../shared/components/Confirmation';
import Modal from '../../../../shared/components/Modal';
import UserForm from '../user-form/UserForm';

const Users = () => {
    const { user } = useContext(AuthContext)

    const initUser = {
        email: "",
        enabled: false,
        firstname: "",
        imagePath: "",
        lastname: "",
        role: "",
        username: "",
        _id: ""
    }

    const [loading, setLoading] = useState(false);
    const [usersList, setUsersList] = useState(null);
    const [editUser, setEditUser] = useState(initUser);
    const [deleteUser, setDeleteUser] = useState(null);
    const [editUserModal, setEditUserModal] = useState(false);
    const [deleteUserModal, setDeleteUserModal] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [mode, setMode] = useState('add');

    const getUsers = () => {
        user && findAll(user.token).then(
            (res) => {
                setUsersList(res.data)
            },
            error => {
                console.log(error);
            }
        )
    }

    const getOneUser = (id) => {
        user && findOne(user.token, id).then(
            (res) => {
                setEditUser(res.data);
            },
            error => {
                console.log(error);
            }
        )
    }

    const removeItem = (id) => {
        let list = usersList.filter(elem => elem._id != id);
        setUsersList(list);
    }

    const addItem = (item) => {
        let list = usersList;
        list.push(item);
        setUsersList(list);
    }

    const updateItem = (item) => {
        let list = usersList;
        const index = list.findIndex(elem => elem._id == item._id)
        list[index] = item;
        setUsersList(list);
    }

    const removeUserAccount = () => {
        console.log("DELETE : ", deleteUser)
        // user && removeUser(user.token, deleteUser._id).then(
        //     (res) => {
        //         removeItem(deleteUser)
        //         closeDeleteModal()
        //         // Toast("SUCCESS", "User deleted successfully");
        //     },
        //     error => {
        //         console.log(error);
        //         // Toast("ERROR", "Error deleting user !");
        //     }
        // )
    }

    useEffect(() => {
        getUsers();
    }, []);

    const addOrEditUser = () => {
        setLoading(true);
        let userData = null
        if (mode === 'add') {
            userData = { ...editUser, password, passwordCheck }
        } else {
            userData = editUser
        }
        user && addOrUpdateUser(user.token, mode, userData).then(
            (res) => {
                setLoading(false);
                if (mode === 'add') {
                    addItem(res.data);
                } else {
                    updateItem(res.data);
                }
                closeAddModal();
                // Toast("SUCCESS", "User details saved successfully");
            },
            error => {
                console.log(error);
                setLoading(false);
                // Toast("ERROR", "Error saving user details !");
            }
        )
    }

    const formatDate = date => {
        return moment(date).format("DD/MM/YYYY HH:mm")
    }

    const openAddModal = () => {
        setEditUserModal(true)
    }

    const closeAddModal = () => {
        setMode('add')
        setEditUserModal(false)
        setEditUser(initUser)
    }

    const openEditModal = (data) => {
        setMode('edit')
        setEditUser(data)
        getOneUser(data._id)
        openAddModal()
    }

    const openDeleteModal = (data) => {
        setDeleteUser(data)
        setDeleteUserModal(true);
    }

    const closeDeleteModal = () => {
        setDeleteUserModal(false);
        setDeleteUser(null)
    }

    const onEditUserChange = (e) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value })
    }

    const onChangeEnabled = (e, data) => {
        setEditUser({ ...editUser, enabled: data.checked })
    }

    const userDetailsForm = (
        <div>FORM</div>
    )

    const addUserModal = (
        <Modal open={editUserModal} confirm={addOrEditUser} cancel={closeAddModal} >
            <UserForm/>    
        </Modal> 
    );

    const deleteModal = (
        <Confirmation open={deleteUserModal} confirm={removeUserAccount} 
            cancel={closeDeleteModal} text={`Are you sure you want to delete ${deleteUser?.username} ?`} />
    );

    const isAdmin = (roles) => {
        const admin = roles.find(elem => elem.label === 'ADMIN');
        return admin !== null;
    }

    const colDefs = [
        {
            headerName: 'Username',
            field: 'username',
            sortable: true,
            filter: true
        },
        {
            headerName: 'Role',
            field: 'role',
            customRender: true,
            sortable: true,
            filter: true,
            cellRender: (data) => {
                return data.roles.map(function (elem) {
                    return elem.label;
                }).join(",");
            }
        },
        {
            headerName: 'Created at',
            field: 'createdAt',
            customRender: true,
            sortable: true,
            filter: true,
            filterOptions: {
                type: 'date'
            },
            cellRender: (data) => {
                return (
                    formatDate(data.createdAt)
                )
            }
        },
        {
            headerName: 'Actions',
            field: 'actions',
            className: 'actions-cell',
            customRender: true,
            style: {
                minWidth: "120px",
                textAlign: 'center'
            },
            cellRender: (data) => {
                return isAdmin(data.roles) ?
                    (
                        <>
                            <Button onClick={() => openEditModal(data)} color="blue">
                                <FaEdit size="14px" />
                            </Button>
                            <Button onClick={() => openDeleteModal(data)} color="red">
                                <FaTrash size="14px" />
                            </Button>
                        </>
                    )
                    : null

            }
        }
    ]


    const dataTable = (
        <Datatable sortable paginated columns={colDefs} datasource={usersList} />
    )


    return (
        <div className="main-div">
            {addUserModal}
            {deleteModal}
            {usersList ? dataTable : (<Loader />)}
        </div>
    )
}

export default Users
