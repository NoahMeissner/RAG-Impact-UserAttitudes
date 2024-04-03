import IntroPage from "@/components/pages/Intro";
import Task from "@/components/pages/Task";
import PostTask from "@/components/pages/PostTask";
import { Inter } from "next/font/google";
import { usePageStore } from "@/src/pagecounter";
import PreStudy from "@/components/pages/PreStudy";
import PreTask from "@/components/pages/PreTask";
import PostStudy from "@/components/pages/PostStudy";
import EndPage from "@/components/pages/EndPage";
import TaskDescription from "@/components/pages/TaskDescription";
import InformedConsent from "@/components/pages/InformedConsent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const { page } = usePageStore();
  // There is a need to refactor the old files like intro.js, pretask.jsx and task.jsx to tsx and change the type of the elementToReturn to jsx
  let elementToReturn: JSX.Element | null = null;
  switch (page) {
    case 0:
      elementToReturn = <IntroPage />;
      break;
    case 1:
      elementToReturn = <InformedConsent/>;
      break;
    case 2:
      elementToReturn = <PreStudy />
      break;
    case 3:
      elementToReturn = <PreTask />;
      break;
    case 4:
      elementToReturn = <TaskDescription />
      break;
    case 5:
      elementToReturn = <Task />
      break;
    case 6:
      elementToReturn = <PostTask />
      break;
    case 7:
      elementToReturn = <PostStudy />
      break;
    case 8:
      elementToReturn = <EndPage />
      break;
  }

  return (
    <main className={`${inter.className}`}>
      {elementToReturn}
    </main>
  );
};
