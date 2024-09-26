/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { CircleCheckBig } from "lucide-react";

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
    <div className="gap-4 flex flex-col items-center h-full">
      <div className="p-4 flex flex-col gap-4 bg-purple-950 w-full items-center">
        <h1 className="text-2xl roboto-regular uppercase w-full text-[#FCA82F] text-center font-bold">
          Intellivolve
        </h1>
        <img src="/banner.png" width={300} className="p-2" alt="" />
        <p className="text-xl text-center text-white font-semibold">
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
          className="w-full p-3 rounded-lg bg-[#361757] text-white text-base"
        />
        <input
          type="text"
          name="organization"
          value={userData.organization}
          onChange={handleUserDataChange}
          placeholder="Organization Name"
          className="w-full p-3 rounded-lg bg-[#361757] text-white text-base"
        />
        <input
          type="text"
          name="location"
          value={userData.location}
          onChange={handleUserDataChange}
          placeholder="Organization Location"
          className="w-full p-3 rounded-lg bg-[#361757] text-white text-base"
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleUserDataChange}
          placeholder="Business Email Address"
          className="w-full p-3 rounded-lg bg-[#361757] text-white text-base"
        />
        <button
          onClick={handleNext}
          className="flex text-sm w-max rounded-lg items-center justify-center px-4 py-2 bg-[#FDB94B] text-[#361757] font-bold"
        >
          Start
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-between h-screen rounded-xl w-full">
      {!isFirstQuestion && (
        <div className="p-4 bg-purple-950">
          <div className="w-full bg-gray-200 transition-all duration-1000 ease-out rounded-full h-1 ">
            <div
              className="bg-[#FCA82F] h-1 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      {!isFirstQuestion && (
        <h2 className="text-base bg-purple-950 text-[#FDB94B] text-center font-bold w-full">
          {currentQuestion.section}
        </h2>
      )}
      {!isFirstQuestion && (
        <div className="flex bg-purple-950 justify-center w-full">
          <img
            className="mt-2 mb-4"
            src={currentQuestion.picture}
            width={250}
            alt="picture"
          />
        </div>
      )}
      <div className="flex-grow">
        {isFirstQuestion ? (
          renderUserDataInputs()
        ) : (
          <>
            <p className="text-base text-center text-white font-semibold mb-4 px-2 py-2">
              {currentQuestion.text}
            </p>
            <div className="flex flex-col gap-3 px-4 items-center">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.value;
                return (
                  <button
                    key={option.value}
                    className={`w-full py-3 text-sm px-4 text-left text-white rounded-lg shadow-lg bg-[#361757] flex items-center justify-between transition-all duration-300 ${
                      isSelected
                        ? "border-2 border-[#FDB94B]"
                        : "border-2 border-transparent"
                    }`}
                    onClick={() =>
                      handleAnswer(currentQuestion.id, option.value)
                    }
                  >
                    <span>{option.value}</span>
                    {isSelected && (
                      <CircleCheckBig className="text-[#FDB94B]" size={15} />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div
        className={`flex ${
          isFirstQuestion ? "justify-center" : "justify-between"
        }  mt-4 py-2 px-5 `}
      >
        <button
          onClick={handlePrevious}
          className={`flex text-sm rounded-full ${
            isFirstQuestion ? "hidden" : ""
          } items-center justify-center px-4 rounded-lg py-2 bg-[#FDB94B] text-[#361757] font-bold disabled:bg-gray-500`}
        >
          Previous
        </button>
        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            className="px-5 py-1 bg-green-500 rounded-lg text-white disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className={`${
              isFirstQuestion && "hidden"
            } flex text-sm rounded-lg items-center justify-center px-7 py-1 bg-[#FDB94B] text-[#361757] font-bold`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileQuiz;
