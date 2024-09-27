import { useState, useEffect } from "react";
import { restructuredQuestions, scoreRanges } from "./assets";
import { supabase } from "../supabase";
import MobileQuiz from "./MobileQuiz";
import "./App.css";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showResult, setShowResult] = useState(false); // New state for showing results
  const [interpretation, setInterpretation] = useState(null);
  const [contactUser, setContactUser] = useState(true);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);

  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    setViewportHeight(); // Set the height when the component mounts
    window.addEventListener('resize', setViewportHeight);
    return () => {
      window.removeEventListener('resize', setViewportHeight);
    };
  }, []);

  const calculateTotalScore = (answers) => {
    const totalScore = restructuredQuestions.reduce((sectionTotal, section) => {
      return (
        sectionTotal +
        section.questions.reduce((questionTotal, question) => {
          const chosenOption = question.options.find(
            (option) => option.value === answers[question.id]
          );
          return questionTotal + (chosenOption ? chosenOption.points : 0);
        }, 0)
      );
    }, 0);

    const firstQuestion = restructuredQuestions[0]?.questions[0];
    const firstQuestionOption = firstQuestion?.options.find(
      (option) => option.value === answers[firstQuestion?.id]
    );
    const firstQuestionPoints = firstQuestionOption
      ? firstQuestionOption.points
      : 0;
    return totalScore - firstQuestionPoints;
  };

  const getInterpretation = (score) => {
    return scoreRanges.find(
      (range) => score >= range.range[0] && score <= range.range[1]
    );
  };

  async function addData(allResponses) {
    const { error } = await supabase.from("survey_result").insert({
      name: allResponses.userData.name,
      organization: allResponses.userData.organization,
      location: allResponses.userData.location,
      email: allResponses.userData.email,
      score: allResponses.totalScore,
      answers: allResponses.answers,
      consent: contactUser,
    });
    console.log(error);
  }

  const handleQuizSubmit = (data) => {
    const totalScore = calculateTotalScore(data.answers);
    const scoreInterpretation = getInterpretation(totalScore);
    setInterpretation(scoreInterpretation);
    setQuizData(data);
    setShowModal(true);
  };

  const handleViewResult = () => {
    setLoading(true); // Start the loading spinner
    if (quizData) {
      const totalScore = calculateTotalScore(quizData.answers);
      const allResponses = {
        ...quizData,
        totalScore,
        interpretation,
      };
      addData(allResponses).then(() => {
        setShowResult(true); // Show results after data is added
        setLoading(false); // Stop the loading spinner
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setInterpretation(null);
    setQuizData(null);
    setShowResult(false); // Reset the result view state
    window.location.reload(); // Refresh the browser
  };

  return (
    <div className="flex justify-center overflow-x-hidden overflow-y-hidden" style={{
      height: 'calc(var(--vh, 1vh) * 100)', // Use the CSS variable for height
    }}>
      <div className="w-screen sm:w-[360px] roboto-regular bg-[#45206C] h-full flex flex-col items-center justify-around">
        <MobileQuiz
          questions={restructuredQuestions}
          onSubmit={handleQuizSubmit}
        />
        {showModal && (
          <div className="fixed inset-0 text-xs bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white flex flex-col gap-2 m-4 p-4 rounded-lg max-w-lg">
              {!showResult ? (
                <div className="flex flex-col items-start gap-8 py-8">
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-base font-bold">Would you like us to contact you?</span>
                    <button
                      className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none ${
                        contactUser ? "bg-blue-600" : "bg-gray-200"
                      }`}
                      onClick={() => setContactUser(!contactUser)}
                    >
                      <span
                        className={`inline-block w-4 h-4 transform transition ${
                          contactUser ? "translate-x-6" : "translate-x-1"
                        } bg-white rounded-full`}
                      />
                    </button>
                  </div>
                  <button
                    onClick={handleViewResult}
                    disabled={loading} // Disable the button during loading
                    className={`bg-blue-500 text-white text-sm px-4 py-2 w-max rounded hover:bg-blue-600 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                    ) : (
                      "View Result"
                    )}
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-4">
                    {interpretation?.title}
                  </h2>
                  <p className="mb-2">
                    <strong>Feedback:</strong> {interpretation?.feedback}
                  </p>
                  <p className="mb-4">
                    <strong>Recommendation:</strong> {interpretation?.recommendation}
                  </p>
                  <p className="mb-4 italic text-gray-600">
                    Thank you for taking the time to complete this survey. Your insights are valuable and will help us improve our organizational strategies.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="bg-blue-500 text-white px-4 py-2 w-1/3 rounded hover:bg-blue-600"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
