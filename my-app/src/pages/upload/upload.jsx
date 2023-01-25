import React, { useState } from 'react';
import Layout from '../../layouts/layout';
import superMarketService from '../../features/chart.service';


export default function Upload() {

    const [file, setFile] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [list, setList] = useState([]);

    const uploadFile = () => {
        const formData = new FormData();

        formData.append('csv', file);

        superMarketService.insertDataViaCSV(formData)
            .then((result) => {
                setIsSuccess(true);

            })
            .catch((error) => {
                setIsError(true)

            })
    }



    if (isError) return <Layout> <div>Error...</div> </Layout>
    if (isSuccess) return <Layout> <div>File Uploaded successfully...</div> </Layout>

    return (
        <Layout>
            <div className='bg-secondary w-50 mt-4 mx-3' >
                <h3 className='text-center '>Insert your CSV file here</h3>
                <form className='container m-3'>
                    <div className="row m-0 p-0">
                        <div className='p-3'>
                            <input
                                type='file'
                                name="file"
                                id='file'
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <div className="col">

                            <button className='btn btn-primary mb-3' onClick={uploadFile}>upload</button>
                        </div>
                    </div>




                </form>

            </div>
        </Layout>
    )
}
