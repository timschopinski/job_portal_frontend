import React, {useContext, useEffect} from "react";
import Link from "next/link";
import DataTable from "react-data-table-component"
import {useRouter} from "next/router";
import AuthContext from "../../context/AuthContext";
import {toast} from "react-toastify";
import JobContext from "../../context/JobContext";


const MyJobs = ({jobs, access_token}) => {

    const {clearErrors, error, created, newJob, setCreated, loading, deleted, deleteJob, setDeleted} = useContext(JobContext);

    const router = useRouter();
    // console.log(job.id);
    useEffect(() => {
        if(error) {
            toast.error(error);
            clearErrors();
        }
        if(deleted) {
            setDeleted(false);
            router.reload(router.asPath)
        }
    }, [error, deleted])

    const deleteJobHandler = (id) => {
        console.log(id);
        deleteJob(id, access_token);

    }

    const customStyles = {
        // rows: {
        //     style: {
        //         minHeight: '72px', // override the row height
        //         minWidth: 'auto', // override the row height
        //         maxWidth: '100%', // override the row height
        //         backgroundColor: 'red'
        //
        //     },
        // },
        // cells: {
        //     style: {
        //         minWidth: 'auto', // override the row height
        //         maxWidth: '100%', // override the row height
        //         // minHeight: '100px',
        //         backgroundColor: "black"
        //     },
        // },
    };


    const columns = [
        {
            name: 'Job ID',
            sortable: true,
            selector: (row) => row.id,
        },
        {
            name: 'Job name',
            sortable: true,
            selector: (row) => row.title,
        },
        {
            name: 'Salary',
            sortable: true,
            selector: (row) => row.salary,
        },
        {
            name: 'Action',
            sortable: true,
            selector: (row) => row.action,
        }
    ];

    const data = [];

    jobs &&
    jobs.forEach((job) => {
        data.push({
            id: job.id,
            title: job.title,
            salary: job.salary,
            action: (
            <>
                <Link href={`/job/jobs/`}>
                    <a className="btn btn-primary">
                        <i aria-hidden className="fa fa-eye"></i>
                    </a>
                </Link>
                <Link href={`/employeer/jobs/candidates/${job.id}`}>
                    <a className="btn btn-success my-2 mx-1">
                        <i aria-hidden className="fa fa-users"></i>
                    </a>
                </Link>
                <Link href={`/employeer/jobs/${job.id}`}>
                    <a className="btn btn-warning">
                        <i aria-hidden className="fa fa-pencil"></i>
                    </a>
                </Link>

                <Link href={"/"}>
                    <a className="btn btn-danger my-2 mx-1" onClick={() => deleteJobHandler(job.id)}>
                        <i aria-hidden className="fa fa-pencil"></i>
                    </a>
                </Link>
            </>
            ),
        });
    });

    return (
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8 mt-5">
                <h4 className="my-5">My Jobs</h4>
                <DataTable columns={columns} data={data} responsive={true} />
            </div>
            <div className="col-2"></div>
        </div>
    )
}

export default MyJobs