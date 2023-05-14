import DonationCards from './DonationCards'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './Navbar';


export default function Donationinfo() {
    return (
      <>
       <section>
          <NavbarComp></NavbarComp>
          <h5 className="display-6 text-center my-5">Access authentic and reliable information of charity organisations all across Pakistan, 
              all at one place.</h5>
          <DonationCards></DonationCards>
       </section>
      </>
    )
}