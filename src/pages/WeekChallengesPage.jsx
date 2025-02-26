import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import ChallengeCard from "../components/ChallengeCard";
import api from "../utils/Api";
import Loader from "../components/Loader";


const WeekChallengesPage = () => {
  const { weekId } = useParams();
  const [allChallenges, setAllChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const weekName = location.state?.weekName || "Week";
  const completedChallengeIds = location.state?.completedChallengeIds || [];

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/user/challenges/${weekId}`);
        setAllChallenges(response.data);
        console.log("Challenges Data participation", response.data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChallenges();
  }, [weekId]);

  return (
    <div className="min-h-screen poppins-regular">
      <Header title={`Challenges for ${weekName}`} />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="px-4 py-4 pb-24">
            {allChallenges.length > 0 ? (
              allChallenges.map((challenge) => {
                let challengeImages = [];

                try {
                  challengeImages = JSON.parse(challenge.challenge_images);
                } catch (error) {
                  console.error("Error parsing challenge_images:", error);
                }

                // Check if the challenge is completed
                const isCompleted = completedChallengeIds.includes(challenge.id);

                return (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    isCompleted={isCompleted} // Pass completion status
                  />
                );
              })
            ) : (
              <p className="text-gray-500 text-center">
                No challenges found for this week.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekChallengesPage;