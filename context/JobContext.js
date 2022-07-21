import { useState, createContext} from "react";
import axios from "axios";
import proccess from "../next.config";


const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(null);
    const [applied, setApplied] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(false);
    const [created, setCreated] = useState(false);
    const [jobs, setJobs] = useState(null);

    // Create a new job
    const newJob = async ( data, access_token) => {
        try {
            setLoading(true);

            const res = await axios.post(`${proccess.env.API_URL}/api/jobs/new/`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })

            if(res.data) {
                setLoading(false);
                setCreated(true);
            }

        } catch (error) {
            setLoading(false);
            setError(error.response && (error.response.data.detail || error.response.data.error));
        }
    };


    // Update a job
    const updateJob = async ( id, data, access_token) => {
        try {
            setLoading(true);
            data.job_type = data.jobType
            delete data['jobType']
            const res = await axios.put(`${proccess.env.API_URL}/api/jobs/${id}/update/`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    }
                });


            if(res.data) {
                setLoading(false);
                setUpdated(true);
            }

        } catch (error) {
            setLoading(false);
            setError(error.response && (error.response.data.detail || error.response.data.error));
        }
    };


    // Apply to job
    const applyToJob = async ( id, access_token) => {
        try {
            setLoading(true);

            const res = await axios.post(`${proccess.env.API_URL}/api/jobs/${id}/apply/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })

            if(res.data.applied === true) {
                setLoading(false);
                setApplied(res.data);
            }

        } catch (error) {
            setLoading(false);
            setError(error.response && (error.response.data.detail || error.response.data.error));
        }
    };

    // Check job applied
    const checkJobApplied = async ( id, access_token) => {
        try {
            setLoading(true);
            const res = await axios.get(`${proccess.env.API_URL}/api/jobs/${id}/check`,

                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });

            setLoading(false);
            setApplied(res.data);

        } catch (error) {
            setLoading(false);
            // setError(error.response && (error.response.data.detail || error.response.data.error));
        }
    };


    // Get Topic Stats
    const getTopicStats = async (topic) => {
        try {
            setLoading(true);
            const res = await axios.get(`${proccess.env.API_URL}/api/stats/${topic}/`);

            setLoading(false);
            setStats(res.data);

        } catch (error) {
            setLoading(false);
            // setError(error.response && (error.response.data.detail || error.response.data.error));
        }
    };


    // Apply to job
    const deleteJob = async ( id, access_token) => {
        try {
            setLoading(true);
            console.log(access_token)
            const res = await axios.delete(`${proccess.env.API_URL}/api/jobs/${id}/delete/`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })

            if(res.data.applied === true) {
                setLoading(false);
                setDeleted(true);
            }

        } catch (error) {
            setLoading(false);
            setError(error.response && (error.response.data.detail || error.response.data.error));
        }
    };


    // Clear Errors
    const clearErrors = () => {
        setError(null);
    }

    return (
        <JobContext.Provider
            value={{
                loading,
                user,
                error,
                updated,
                setUpdated,
                applied,
                stats,
                created,
                setCreated,
                jobs,
                setJobs,
                setDeleted,
                deleted,
                deleteJob,
                newJob,
                applyToJob,
                getTopicStats,
                updateJob,
                clearErrors,
                checkJobApplied,
            }}
        >
            {children}
        </JobContext.Provider>
    );
};

export default JobContext;