# 15 — Sample Data (illustrative)

All names, places and details below are placeholders for a fictional project.

## products.json
```json
[
  {
    "id": "red-rice",
    "name": "Bhutanese Red Rice",
    "category": "grains",
    "origin": "Paro valley (illustrative)",
    "seasonMonths": [10, 11, 12],
    "description": "Nutty, earthy grain grown in terraced fields.",
    "image": "assets/images/red-rice.webp",
    "farmerId": "farmer-01",
    "businessAvailable": true
  },
  {
    "id": "wild-honey",
    "name": "Local Honey",
    "category": "honey",
    "origin": "Bumthang (illustrative)",
    "seasonMonths": [5, 6, 7, 8, 9],
    "description": "Golden honey collected by small local beekeepers.",
    "image": "assets/images/honey.webp",
    "farmerId": "farmer-02",
    "businessAvailable": true
  },
  {
    "id": "seasonal-greens",
    "name": "Seasonal Leafy Greens",
    "category": "vegetables",
    "origin": "Thimphu valley (illustrative)",
    "seasonMonths": [3, 4, 5, 9, 10],
    "description": "Fresh greens harvested close to the day of delivery.",
    "image": "assets/images/greens.webp",
    "farmerId": "farmer-03",
    "businessAvailable": true
  }
]
```

## farmers.json
```json
[
  {
    "id": "farmer-01",
    "name": "Illustrative Farmer One",
    "village": "Village, Paro",
    "grows": ["red-rice", "buckwheat"],
    "story": "A short story about the farmer's day, methods and pride in the work.",
    "image": "assets/images/farmer-01.webp"
  }
]
```

## recipes.json
```json
[
  {
    "id": "red-rice-bowl",
    "title": "Red Rice Bowl with Seasonal Vegetables",
    "type": "recipe",
    "products": ["red-rice", "seasonal-greens"],
    "time": "30 min",
    "summary": "A simple, hearty bowl built around local red rice.",
    "image": "assets/images/red-rice-bowl.webp"
  }
]
```

## faq.json (8 needed)
```json
[
  { "q": "How do I place an order?", "a": "Send an enquiry from the Contact page. We confirm availability, price and delivery." }
]
```
