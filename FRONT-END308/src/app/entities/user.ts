
export class User {
  username: string;
  first_name: string;
  last_name: string;
  user_password: string;
  city: string;
  state_id: string;
  address: string;
  zip: string;
  population_coefficient: number;
  fairness_coefficient: number;
  compactness_coefficient: number;
  role: string;
  constructor() {
    this.population_coefficient = 1.0;
    this.compactness_coefficient = 1.0;
    this.fairness_coefficient = 1.0;
  }
}
