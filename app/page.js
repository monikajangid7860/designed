import LayeredEditorialHero from '../components/LayeredEditorialHero';
import RecentWorkStack from '../components/RecentWorkStack';
import TheStudio from '../components/TheStudio';
import ProcessHorizontalScroll from '../components/ProcessHorizontalScroll';
import RotatingGallery3D from '../components/RotatingGallery3D';
import TypographicSplit from '../components/TypographicSplit';
import ScrapbookFloat from '../components/ScrapbookFloat';
import BouncingFooter from '../components/BouncingFooter';
import ScrollStory from '../components/ScrollStory';
import ZigzagTeamFloat from '../components/ZigzagTeamFloat';
import CategoryShutter from '../components/CategoryShutter';
import ViewfinderGallery from '../components/ViewfinderGallery';
import CleatShowcase from '../components/CleatShowcase';
import GoldsolidTurntable from '../components/GoldsolidTurntable';

export default function Home() {
  return (
    <main id="top">
      <LayeredEditorialHero />
      {/* <RecentWorkStack /> */}
      <ScrollStory />
      <GoldsolidTurntable />
      <CleatShowcase />
      {/* <TheStudio /> */}
      {/* <ProcessHorizontalScroll /> */}
      {/* <RotatingGallery3D /> */}
      {/* <TypographicSplit /> */}
      {/* <ScrapbookFloat /> */}
      <ZigzagTeamFloat />
      <CategoryShutter />
      <ViewfinderGallery />
      {/* <BouncingFooter /> */}
    </main>
  );
}