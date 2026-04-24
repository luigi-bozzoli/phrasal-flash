
import './App.css'
import { Header } from './components/Header';
import { useState } from "react";
import { FlashcardView } from './view/FlashcardView';
import { ListView } from './view/ListView';


function App() {
  const [activeView, setActiveView] = useState<"flashcard" | "listview">("flashcard");


  return (
    <>
      <Header activeView={activeView} onViewChange={setActiveView} />
      {activeView === "flashcard" ? <FlashcardView /> : <ListView />}
    </>
  )
}

export default App
