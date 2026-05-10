import Banner from '../components/Banner';
import BottomSec from '../components/BottomSec';
import ShopByDepartment from '../components/Departments';
import FeaturedCollection from '../components/FeaturedCollection';
import Footer from '../components/Footer';
import HeroSection from '../components/Hero';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
const HomePage = () => {
  return (
    
    <>
    <HeroSection/>
    <ShopByDepartment/>
    <Banner/>
    <FeaturedCollection/>
    <Services/>
    <BottomSec/> 
    </>
  );
};

export default HomePage;