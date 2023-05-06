export default function DonationSubmission(){
    return (
        <>
        <h2>Submit Donation</h2>
        <input type="radio" value="simple" name="donationType"/> Simple Donation
        <input className="ms-3" type="radio" value="advanced" name="donationType"/> Advanced Donation
        </> 
    )
}