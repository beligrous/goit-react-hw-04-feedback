import { useState } from 'react';
import { Container } from './feedback.styled';
import Statistics from 'components/Statstics/Statistics';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';

export default function Feedback() {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const { good, neutral, bad } = feedback;

  const handleClick = name => {
    setFeedback(prevState => ({ ...prevState, [name]: prevState[name] + 1 }));
  };

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    let result;
    if (total === 0 && good === 0) {
      result = 0;
    } else {
      result = Math.round((good / total) * 100);
    }

    return result;
  };

  return (
    <Container>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={handleClick}
        />
      </Section>
      <Section title={'Statistics'}>
        {good !== 0 || neutral !== 0 || bad !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message={'There is no feedback'} />
        )}
      </Section>
    </Container>
  );
}
