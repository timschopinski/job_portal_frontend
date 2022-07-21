import React, {useContext, useEffect} from "react";
import Link from "next/link";
import DataTable from "react-data-table-component"
import {useRouter} from "next/router";
import AuthContext from "../../context/AuthContext";
import {toast} from "react-toastify";
import JobContext from "../../context/JobContext";


const JobCandidates = ({ candidatesApplied }) => {
    const customStyles = {
        rows: {
            style: {
                borderBottom: 'ridge #e9e6e6'
            },
        },
        headRow: {
            style: {
                borderBottom: 'ridge #e9e6e6'
            }
        },
    };

    const columns = [
        {
            name: 'Job Name',
            sortable: true,
            selector: (row) => row.title
        },
        {
            name: 'User ID',
            sortable: true,
            selector: (row) => row.id
        },
        {
            name: 'Candidate Resume',
            sortable: true,
            selector: (row) => row.resume
        },
        {
            name: 'Applied At',
            sortable: true,
            selector: (row) => row.appliedAt
        }
    ];

    const data = [];

    candidatesApplied &&
    candidatesApplied.forEach((item) => {
        data.push({
            title: item.job.title,
            id: item.job.user,
            resume: (
                <Link href={`https://jobs-portal-api.s3.amazonaws.com/${item.resume}`}>
                    <a
                        className="text-success "
                        rel="noreferrer"
                        target="_blank"
                    >
                        <b>
                            <i aria-hidden className="fas fa-download"></i> View Resume
                        </b>
                    </a>
                </Link>
            ),
            appliedAt: item.applied_at.substring(0, 10),
        });
    });
    console.log(candidatesApplied)

    return (
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8 mt-5">
                <h4 className="my-5">
                    {candidatesApplied &&
                    `${candidatesApplied.length} Candidates applied to this job`}
                </h4>
                <DataTable columns={columns} data={data} responsive={true} customStyles={customStyles}/>
            </div>
            <div className="col-2"></div>
        </div>
    )
}

export default JobCandidates