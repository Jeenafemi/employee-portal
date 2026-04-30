import { useState, useEffect } from 'react';
import { getList, } from '../api/apiServices/userService';

const useFetchUser = () => {
    const [error, setError] = useState('');
    const [list, setList] = useState([{id:'',name: '', email: "",
        phone: "",
        linkedin: "",
        portfolio: "",
        experience: "",
        reactExperience: "",
        gender: "",
        resume: "",
        coverLetter: "",
        immediate: "",
        startDate: '',
        hired:false,
     }])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getList();
                setList(response);
            }
            catch (error) {
                setError("something went wrong");
            } finally {
                // setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    return { list, error, };
};

export default useFetchUser;
