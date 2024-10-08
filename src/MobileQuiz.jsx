/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { CircleCheckBig } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MobileQuiz = ({ questions, onSubmit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userData, setUserData] = useState({
    name: "",
    organization: "",
    location: "",
    email: "",
  });

  const allQuestions = useMemo(
    () =>
      questions.flatMap((section) =>
        section.questions.map((q) => ({ ...q, section: section.section }))
      ),
    [questions]
  );

  const currentQuestion = allQuestions[currentIndex];
  const isLastQuestion = currentIndex === allQuestions.length - 1;
  const isFirstQuestion = currentIndex === 0;

  const allQuestionsAnswered = useMemo(() => {
    return allQuestions.every((q) => answers[q.id] !== undefined);
  }, [allQuestions, answers]);

  const progress = useMemo(() => {
    const answeredCount = Object.keys(answers).length;
    return (answeredCount / (allQuestions.length - 1)) * 100;
  }, [answers, allQuestions]);

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentIndex < allQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit({ userData, answers });
  };

  const renderUserDataInputs = () => (
    <div className="gap-4 flex flex-col sm:rounded-lg items-center h-full">
      <div className="p-4 flex sm:rounded-t-lg flex-col gap-4 bg-[#fafafa] w-full items-center">
        <h1 className="text-2xl roboto-regular uppercase w-full text-[#0F469A] text-center font-bold">
          Intellivolve
        </h1>
        <LazyLoadImage
          alt=""
          effect="blur"
          width={288}
          src="/banner.webp"
          placeholderSrc="/banner.webp" // Optional blur-up while loading
        />
        <p className="text-xl text-center text-[#0F469A] font-semibold">
          Self Diagnosis Tool
        </p>
      </div>
      <div className="flex flex-col items-center w-3/4 gap-4">
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleUserDataChange}
          placeholder="Your Name"
          className="w-full max-w-[288px] p-3 border-2 rounded-lg text-black text-sm"
        />
        <input
          type="text"
          name="organization"
          value={userData.organization}
          onChange={handleUserDataChange}
          placeholder="Organization Name"
          className="w-full max-w-[288px] p-3 rounded-lg border-2 text-black text-sm"
        />
        <input
          type="text"
          name="location"
          value={userData.location}
          onChange={handleUserDataChange}
          placeholder="Organization Location"
          className="w-full max-w-[288px] p-3 rounded-lg border-2 text-black text-sm"
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleUserDataChange}
          placeholder="Business Email Address"
          className="w-full max-w-[288px] p-3 rounded-lg border-2 text-black text-sm"
        />
        <button
          onClick={handleNext}
          className="flex text-sm w-max rounded-lg items-center justify-center px-4 py-2 bg-[#0F469A] text-[#fafafa] font-bold"
        >
          Start
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-between h-screen w-full">
      {!isFirstQuestion && (
        <div className="p-4 bg-[#fafafa] sm:rounded-t-lg flex justify-center">
          <div className="w-full max-w-[288px] bg-gray-200 transition-all duration-1000 ease-out rounded-full h-1 ">
            <div
              className="bg-[#ffd700] h-1 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      {!isFirstQuestion && (
        <h2 className="text-[17px] bg-[#fafafa] text-black text-center font-bold w-full">
          {currentQuestion.section}
        </h2>
      )}
      {!isFirstQuestion && (
        <div className="flex bg-[#fafafa] justify-center w-full">
          <LazyLoadImage
          alt=""
          effect="blur"
          className="mt-2 mb-2"
          width={250}
          src={currentQuestion.picture}
          placeholderSrc={currentQuestion.picture} // Optional blur-up while loading
        />
        </div>
      )}
      <div className="flex-grow">
        {isFirstQuestion ? (
          renderUserDataInputs()
        ) : (
          <>
            <div className="w-full flex justify-center">
              <p className="text-[17px] text-center text-[#C08E00] font-semibold mb-4 px-2 py-2">
                {currentQuestion.text}
              </p>
            </div>
            <div className="flex flex-col gap-3 px-4 items-center">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.value;
                return (
                  <button
                    key={option.value}
                    className={`w-full max-w-[288px] py-3 text-sm px-4 text-left font-medium rounded-lg shadow-lg  flex items-center justify-between transition-all duration-300 ${
                      isSelected
                        ? "border-2 border-transparent bg-[#DCEAF7] text-[#0F469A]"
                        : "border-2 text-black"
                    }`}
                    onClick={() =>
                      handleAnswer(currentQuestion.id, option.value)
                    }
                  >
                    <span>{option.value}</span>
                    {isSelected && (
                      <CircleCheckBig className="text-[#0F469A]" size={15} />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className="w-full pb-4 flex justify-center">
        <div
          className={`flex ${
            isFirstQuestion ? "justify-center" : "justify-between"
          }  mt-4 w-full max-w-[288px] mx-4`}
        >
          <button
            onClick={handlePrevious}
            className={`flex text-sm rounded-full ${
              isFirstQuestion ? "hidden" : ""
            } items-center justify-center px-4 rounded-lg py-2 bg-[#0F469A] text-[#fafafa] font-medium disabled:bg-gray-500`}
          >
            Previous
          </button>
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered}
              className="px-5 py-1 text-sm bg-[#0F469A] font-medium rounded-lg text-white disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`${
                isFirstQuestion && "hidden"
              } flex text-sm rounded-lg items-center justify-center px-7 py-1 bg-[#0F469A] text-[#fafafa] font-medium`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileQuiz;
