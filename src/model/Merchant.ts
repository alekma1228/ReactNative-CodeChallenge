export interface Merchant {
  id: number
  name: string
  logo_url: string
  url: {
    complete: string
  }
  ratings: {
    overall_rating: number
    star_rating: number
    num_ratings: number
  }
  cuisines: string[]
  price_rating: number
  location: {
    street: string
    state: string
    zip: string
  }
}

export interface Sidebar {
  id: number
  name: string
  logo_url: string
  url: {
    complete: string
  }
  ratings: {
    overall_rating: number
    star_rating: number
    num_ratings: number
  }
  cuisines: []
  price_rating: null
  location: {
    street: string
    state: string
    zip: string
  }
}

export interface Sponsored {
  id: number
  name: string
  logo_url: string
  url: {
    complete: string
  }
  ratings: {
    overall_rating: number
    star_rating: number
    num_ratings: number
  }
  cuisines: []
  price_rating: number
  location: {
    street: string
    state: string
    zip: string
  }
}
