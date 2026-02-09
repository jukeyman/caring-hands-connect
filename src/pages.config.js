/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import About from './pages/About';
import AdminBilling from './pages/AdminBilling';
import AdminClients from './pages/AdminClients';
import AdminDashboard from './pages/AdminDashboard';
import AdminScheduling from './pages/AdminScheduling';
import AdvanceDirective from './pages/AdvanceDirective';
import Billing from './pages/Billing';
import CarePlan from './pages/CarePlan';
import Careers from './pages/Careers';
import CaregiverBurnout from './pages/CaregiverBurnout';
import CaregiverDashboard from './pages/CaregiverDashboard';
import CaregiverProfile from './pages/CaregiverProfile';
import ClockInOut from './pages/ClockInOut';
import CommunicationAlzheimers from './pages/CommunicationAlzheimers';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import EarlySignsDementia from './pages/EarlySignsDementia';
import FamilyEndOfLifeConversation from './pages/FamilyEndOfLifeConversation';
import First90DaysStroke from './pages/First90DaysStroke';
import GriefBereavement from './pages/GriefBereavement';
import Home from './pages/Home';
import HomeModificationsSeniors from './pages/HomeModificationsSeniors';
import HospicePalliativeCare from './pages/HospicePalliativeCare';
import Locations from './pages/Locations';
import Messages from './pages/Messages';
import MySchedule from './pages/MySchedule';
import PayrollHours from './pages/PayrollHours';
import PhysicalTherapyStroke from './pages/PhysicalTherapyStroke';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Resources from './pages/Resources';
import SafeHomeDementia from './pages/SafeHomeDementia';
import Services from './pages/Services';
import SpeechRecoveryStroke from './pages/SpeechRecoveryStroke';
import StrokePrevention from './pages/StrokePrevention';
import Sundowning from './pages/Sundowning';
import TermsOfService from './pages/TermsOfService';
import ThankYou from './pages/ThankYou';
import TheConversation from './pages/TheConversation';
import TrainingCertifications from './pages/TrainingCertifications';
import VAAidAttendance from './pages/VAAidAttendance';
import VAApplicationProcess from './pages/VAApplicationProcess';
import VAVsPrivateCare from './pages/VAVsPrivateCare';
import VeteransResources from './pages/VeteransResources';
import VisitNotes from './pages/VisitNotes';
import WhenTimeHomeCare from './pages/WhenTimeHomeCare';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminBilling": AdminBilling,
    "AdminClients": AdminClients,
    "AdminDashboard": AdminDashboard,
    "AdminScheduling": AdminScheduling,
    "AdvanceDirective": AdvanceDirective,
    "Billing": Billing,
    "CarePlan": CarePlan,
    "Careers": Careers,
    "CaregiverBurnout": CaregiverBurnout,
    "CaregiverDashboard": CaregiverDashboard,
    "CaregiverProfile": CaregiverProfile,
    "ClockInOut": ClockInOut,
    "CommunicationAlzheimers": CommunicationAlzheimers,
    "Contact": Contact,
    "Dashboard": Dashboard,
    "EarlySignsDementia": EarlySignsDementia,
    "FamilyEndOfLifeConversation": FamilyEndOfLifeConversation,
    "First90DaysStroke": First90DaysStroke,
    "GriefBereavement": GriefBereavement,
    "Home": Home,
    "HomeModificationsSeniors": HomeModificationsSeniors,
    "HospicePalliativeCare": HospicePalliativeCare,
    "Locations": Locations,
    "Messages": Messages,
    "MySchedule": MySchedule,
    "PayrollHours": PayrollHours,
    "PhysicalTherapyStroke": PhysicalTherapyStroke,
    "PrivacyPolicy": PrivacyPolicy,
    "Resources": Resources,
    "SafeHomeDementia": SafeHomeDementia,
    "Services": Services,
    "SpeechRecoveryStroke": SpeechRecoveryStroke,
    "StrokePrevention": StrokePrevention,
    "Sundowning": Sundowning,
    "TermsOfService": TermsOfService,
    "ThankYou": ThankYou,
    "TheConversation": TheConversation,
    "TrainingCertifications": TrainingCertifications,
    "VAAidAttendance": VAAidAttendance,
    "VAApplicationProcess": VAApplicationProcess,
    "VAVsPrivateCare": VAVsPrivateCare,
    "VeteransResources": VeteransResources,
    "VisitNotes": VisitNotes,
    "WhenTimeHomeCare": WhenTimeHomeCare,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};