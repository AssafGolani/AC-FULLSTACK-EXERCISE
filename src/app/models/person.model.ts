export interface Person {
  ID: string;
  FirstName: string;
  LastName: string;
  Age: number;
  Height: number;
  Weight: number;
  HeartRate: string;
}

export interface HeartRateData {
  firstMinuteSleeping: number | null;
  firstMinuteAwake: number | null;
  firstMinuteWorkout: number | null;
  averageHeartRate: number;
}
