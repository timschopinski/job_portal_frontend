import Layout from "../components/layout/Layout";
import Home from "../components/Home";
import axios from "axios"

export default function Index({ data }) {

  return (
    <Layout>
      <Home data={data}/>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {

    const job_type = query.job_type || '';
    const education = query.education || '';
    const experience = query.experience || '';
    const keyword = query.keyword || '';
    const location = query.location || '';
    const page = query.page || 1;

    let minSalary = '';
    let maxSalary = '';

    if(query.salary) {
        const [min, max] = query.salary.split('-');
        minSalary = min;
        maxSalary = max;
    }

    const queryString = `keyword=${keyword}&location=${location}&page=${page}&job_type=${job_type}&education=${education}&experience=${experience}&min_salary=${minSalary}&max_salary=${maxSalary}`;

    const res = await axios.get(`${process.env.API_URL}/api/jobs/?${queryString}`)
    const data = res.data;

    return {
        props: {
            data,
        }
    }
}