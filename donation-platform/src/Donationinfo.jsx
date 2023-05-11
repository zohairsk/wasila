import DonationCards from './DonationCards'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './Navbar';


export default function Donationinfo() {
    return (
      <>
       <section>
          <NavbarComp></NavbarComp>
          {/* <h1>Donation Platform</h1> */}
          <div>
            <p>Access authentic and reliable information of charity organisations all across Pakistan, 
              all at one place.</p>
          </div>
          <DonationCards></DonationCards>
       </section>
      </>
    )
}