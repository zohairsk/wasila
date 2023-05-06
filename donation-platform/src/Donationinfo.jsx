import DonationCards from './DonationCards'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './Navbar';


export default function Donationinfo() {
    return (
      <>
       <section>
          <NavbarComp></NavbarComp>
          <h1>Donation Platform</h1>
          <div>
            <p>donate pls!</p>
          </div>
          <DonationCards></DonationCards>
       </section>
      </>
    )
}