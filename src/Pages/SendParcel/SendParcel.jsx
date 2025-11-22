import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const SendParcel = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];
    const senderRegion = useWatch({control, name: 'senderRegion'});
    const receverRegion = useWatch({control, name: 'receiverRegion'})

    const districtsByRegion = (region) =>{
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }
    

    const handleSendParcel = data => {
        console.log(data);
        const isDocument = data.parcelType === 'document'
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);
        
        let cost = 0;
        if(isDocument){
            cost = isSameDistrict ? 60 : 80;
        }else{
            if(parcelWeight < 3){
                cost = isSameDistrict ? 110 : 150;
            }
            else{
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight -3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }
        console.log('cost', cost)

        Swal.fire({
  title: "Agree with the cost?",
  text: `You will be charged ${cost} taka!`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "I agrre"
}).then((result) => {
  if (result.isConfirmed) {


    
    // Swal.fire({
    //   title: "Deleted!",
    //   text: "Your file has been deleted.",
    //   icon: "success"
    // });
  }
});
    }
    return (
        <div>
            <h1 className='text-5xl font-bold mt-10'>Send A Paecel</h1>
            <form onSubmit={handleSubmit(handleSendParcel)} className='mt-12 p-4 text-black'>
                {/* parcel type */}
                <div>
                    <label className='label mr-4'>
                        <input type="radio" {...register('parcelType')} value="document" className="radio" defaultChecked />
                        Document
                    </label>
                    <label className='label'>
                        <input type="radio" {...register('parcelType')} value="non-document" className="radio" />
                        Non-Document
                    </label>
                </div>

                {/* parcel info: name, weight */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg)</label>
                        <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>
                </div>

                {/* to colum */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* sender Details */}

                    <fieldset className="fieldset">
                        <h3 className='text-2xl font-semibold'>Sender Details</h3>
                        {/* sender name */}
                        <label className="label">Sender Name</label>
                        <input type="text" {...register('senderName')} className="input w-full" placeholder="Sender Name" />
                        {/* sender email */}
                        <label className="label">Sender Email</label>
                        <input type="email" {...register('senderEmail')} className="input w-full" placeholder="Sender Email" />


                        {/* sender region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Regions</legend>
                            <select {...register('senderRegion')} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                } 
                            </select>  
                        </fieldset>

                        {/* sender districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Districts</legend>
                            <select {...register('senderDistrict')} defaultValue="Pick a district" className="select">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtsByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                                
                               
                            </select>
                            
                        </fieldset>


                        {/* sender address */}
                        <label className="label mt-4">Sender Address</label>
                        <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />
                        {/* sender District */}
                        <label className="label mt-4">Sender District</label>
                        <input type="text" {...register('senderDistrict')} className="input w-full" placeholder="Sender District" />
                    </fieldset>

                    {/* receiver Details */}
                    <fieldset className="fieldset">
                        <h3 className='text-2xl font-semibold'>Receiver Details</h3>
                        {/* receiver name */}
                        <label className="label">Receiver Name</label>
                        <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />

                        {/* receiver email */}
                        <label className="label">Receiver Email</label>
                        <input type="email" {...register('receiverEmail')} className="input w-full" placeholder="Receiver Email" />

                         {/* receiver region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver Regions</legend>
                            <select {...register('receiverRegion')} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                } 
                            </select>  
                        </fieldset>

                       {/* receiver district */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver District</legend>
                            <select {...register('receiverDistrict')} defaultValue="Pick a district" className="select">
                                <option disabled={true}>Pick a district</option>
                                {
                                   districtsByRegion(receverRegion).map((d, i)=> <option key={i} value={d}>{d}</option>)
                                } 
                            </select>  
                        </fieldset>

                        {/* receiver address */}
                        <label className="label mt-4">Receiver Address</label>
                        <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />

                    </fieldset>

                </div>
                <input type="submit" className='btn btn-primary text-black mt-8' value="Send Parcel" />
            </form>
        </div>
    )
}

export default SendParcel