import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";
import { useStateContext } from "../contexts/Contextprovider";
import { Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function Users() {
    const {user} = useStateContext();
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        axiosClient.get('/user-list')
            .then(response => {
                setUserList(response.data.pendingUser);
                setLoading(false);

            })
            .catch(error => {
                console.log('Error fetching data:', error);

            });
    }, []);

    //approve user
    const handleClickApprove = (id) => {
        Swal.fire({
            title: "Are you sure you want to approve this request?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
            const response = axiosClient.put(`/user/${id}/approve-user`)
            .then(response => {
                if (response.data.status === 200) {
                  Swal.fire({
                    title: "Success",
                    text: response.data.message,
                    icon: "success",
                    button: "Ok",
                  }).then((willRefresh) => {
                    if (willRefresh) {
                      window.location.reload();
                    } else {
                      Swal("The page was not refreshed.");
                    }
                  });
                } else if (res.data.status === 404) {
                  alert("res.data.message");
                }
              }).catch(function (error) {
                if (error.response) {
                  if (error.response.status === 404) {
                    alert(error.response.data.message);
                  }
                  if (error.response.status === 500) {
                    alert(error.response.data);
                  }
                }
              });
        }
    })

    };

    // Reject user
    const handleClickReject =  (id) => {
        Swal.fire({
            title: "Are you sure you want to reject this request?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
              const response = axiosClient.put(`/user/${id}/reject-user`)
                .then(response => {
                  if (response.data.status === 200) {
                    Swal.fire({
                      title: "Success",
                      text: response.data.message,
                      icon: "success",
                      button: "Ok",
                    }).then((willRefresh) => {
                      if (willRefresh) {
                        window.location.reload();
                      } else {
                        Swal("The page was not refreshed.");
                      }
                    });
                  } else if (res.data.status === 404) {
                    alert("res.data.message");
                  }
                }).catch(function (error) {
                  if (error.response) {
                    if (error.response.status === 404) {
                      alert(error.response.data.message);
                    }
                    if (error.response.status === 500) {
                      alert(error.response.data);
                    }
                  }
                });
            }
          });
    };


    const openImage = (proof_id, first_name) => {
        Swal.fire({
            title: `${first_name}`,
            text: "Uploading Id picture",
            imageUrl: `http://127.0.0.1:8000/${proof_id}`,
            imageWidth: 1000,
            imageHeight: 500,
            imageAlt: "Custom image"
        });
    };
    return (
        <div className={`${user.user_type === "admin" ? "block" : "hidden"}`}>
            {userList.length === 0 && <div className="text-center fixed top-[51%] left-[47%]">No current user request</div>}
                {loading && <ClipLoader className="absolute left-[50%] top-[45%]"
                    color={'#010101'}
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />}
            <table className="table-fixed w-[80%] mx-auto mt-10 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-center">

                        <th scope="col" className="text-center px-2 py-2">
                            Firstname
                        </th>
                        <th scope="col" className="text-center px-2 py-2">
                            Lastname
                        </th>
                        <th scope="col" className="text-center px-2 py-2">
                            email
                        </th>
                        <th scope="col" className="text-center px-2 py-2">
                            Proof Id
                        </th>

                        <th scope="col" className="text-center px-2 py-2">
                            Status
                        </th>
                        <th scope="col" className="text-center px-2 py-2">
                            Action
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {userList.map(user => (
                        <tr className="text-center" key={user.id}>
                            <td className="border-b">{user.first_name}</td>
                            <td className="border-b">{user.last_name}</td>
                            <td className="border-b">{user.email}</td>
                            <td className="border-b font-medium text-blue-600  dark:text-blue-500 hover:no-underline" onClick={() => openImage(user.proof_id, user.first_name)}>Proof Id</td>
                            <td className={`border-b ${user.status === "pending" ? "text-yellow-600" : "text-green-600"} px-6 py-4`}> <b>{user.status}</b></td>



                            {user.status === "pending"
                            ?
                            <td className="border-b px-6 py-4 flex">
                                <button type="button" onClick={() => handleClickApprove(user.id)} className="focus:outline-none text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-700 dark:hover:bg-cyan-700 dark:focus:ring-red-900">Approve</button>
                                <button type="button" onClick={() => handleClickReject(user.id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-700 dark:hover:bg-cyan-700 dark:focus:ring-red-900">Reject</button>
                            </td>
                            :
                            <td className="border-b px-6 py-4 flex justify-center h-20">
                                <div className="font-bold text-2xl my-auto">-</div>
                            </td>

                            }



                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
