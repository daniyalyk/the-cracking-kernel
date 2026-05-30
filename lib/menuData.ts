// Menu data — all items mapped to local image assets
// Categories: Brunch, Food, Desserts, Bar

export interface MenuItemData {
  id: string;
  name: string;
  price: number;
  category: string;
  desc: string;
  image: string;
}

export interface MenuCategory {
  category: string;
  slug: string;
  heroImage: string;
  items: MenuItemData[];
}

const generateId = (category: string, name: string) =>
  `${category}-${name}`.toLowerCase().replace(/\s+/g, "-");

export const menuCategories: MenuCategory[] = [
  {
    category: "Brunch",
    slug: "brunch",
    heroImage: "/assets/pictures/menu/Brunch_Menu.webp",
    items: [
      {
        id: generateId("brunch", "The Full American"),
        name: "The Full American",
        price: 1650,
        category: "Brunch",
        desc: "Steak & eggs with chimichurri sauce, baked beans, country potatoes & grilled tomato - served with choice of bread or pair of pancakes.",
        image: "/assets/pictures/food/Brunch/The Full American.webp",
      },
      {
        id: generateId("brunch", "Turkish Eggs"),
        name: "Turkish Eggs (Çılbır)",
        price: 1150,
        category: "Brunch",
        desc: "Creamy poached eggs, in cooled creamy garlic-herb infused yogurt, Thai-Bird Chilli and a drizzle of chilli oil - served with choice of bread.",
        image: "/assets/pictures/food/Brunch/Turkish Eggs.webp",
      },
      {
        id: generateId("brunch", "Poutine Shakshouka"),
        name: "Poutine Shakshouka",
        price: 1250,
        category: "Brunch",
        desc: "Shakshouka with a twist. A base of fries, spicy marinara, mushrooms, cheese & eggs on top.",
        image: "/assets/pictures/food/Brunch/Poutine Shakshouka.webp",
      },
      {
        id: generateId("brunch", "Croque Madame"),
        name: "Croque Madame",
        price: 1350,
        category: "Brunch",
        desc: "Layers of grilled chicken & turkey bacon bits, doused in béchamel sauce, topped with melted mozzarella & a fried egg - served with country potatoes.",
        image: "/assets/pictures/food/Brunch/Croque Madame.webp",
      },
      {
        id: generateId("brunch", "Middle Eastern Poached Eggs"),
        name: "Middle Eastern Poached Eggs",
        price: 1250,
        category: "Brunch",
        desc: "Poached eggs on a bed of in-house hummus, chunks of feta cheese, cherry tomatoes, green olives & a drizzle of chilli oil - served with toasted pita bread.",
        image: "/assets/pictures/food/Brunch/Middle Eastern Poached Eggs.webp",
      },
      {
        id: generateId("brunch", "Pancakes"),
        name: "Chocolate Chunk Pancakes with Bavarian Cream",
        price: 1050,
        category: "Brunch",
        desc: "Stack of pancakes topped with chocolate ganache & bavarian cream.",
        image: "/assets/pictures/food/Brunch/Pancakes.webp",
      },
      {
        id: generateId("brunch", "Smoked Salmon Muffin"),
        name: "Smoked Salmon & Cream Cheese Muffin",
        price: 1350,
        category: "Brunch",
        desc: "English Muffin topped with smoked salmon, cream cheese, fried egg & hollandaise - served with side-salad & country potatoes.",
        image: "/assets/pictures/food/Brunch/Smoked Salmon & Cream Cheese Muffin.webp",
      },
    ],
  },
  {
    category: "Food",
    slug: "food",
    heroImage: "/assets/pictures/menu/Food_Menu.webp",
    items: [
      {
        id: generateId("food", "Brisket Sandwich"),
        name: "Smoked Beef Brisket Sandwich",
        price: 1550,
        category: "Food",
        desc: "House-smoked beef brisket, smoked hickory BBQ sauce, dijon mustard, caramelised onions, orange cheddar, rocket.",
        image: "/assets/pictures/food/Brisket Sandwich.webp",
      },
      {
        id: generateId("food", "Caesar Salad"),
        name: "Caesar Salad",
        price: 1050,
        category: "Food",
        desc: "Iceberg, caesar dressing, chicken strips, sun-dried tomatoes, toasted croutons, parmesan cheese.",
        image: "/assets/pictures/food/Caesar Salad.webp",
      },
      {
        id: generateId("food", "Chicken Parmy Sandwich"),
        name: "Chicken Parmy Sandwich",
        price: 1450,
        category: "Food",
        desc: "Crumbed chicken breast, pesto-garlic aioli, marinara, melted mozzarella, rocket.",
        image: "/assets/pictures/food/Chicken Parmy Sandwich.webp",
      },
      {
        id: generateId("food", "Chicken Roulade"),
        name: "Italian-Style Chicken Roulade",
        price: 1750,
        category: "Food",
        desc: "Breaded chicken stuffed with herbed cheese, spinach, roasted bell peppers, mushrooms, topped with a spicy sauce, side of mash & sautéed vegetables.",
        image: "/assets/pictures/food/Chicken Roulade.webp",
      },
      {
        id: generateId("food", "Mac & Cheese"),
        name: "Baked Mac & Cheese",
        price: 1150,
        category: "Food",
        desc: "Macaroni, mozzarella, cheddar, breadcrumb crust, garlic bread.",
        image: "/assets/pictures/food/Mac & Cheese.webp",
      },
      {
        id: generateId("food", "Moroccan Chicken"),
        name: "Grilled Chicken with Moroccan",
        price: 1650,
        category: "Food",
        desc: "Grilled chicken, Moroccan sauce, rice & sautéed vegetables.",
        image: "/assets/pictures/food/Moroccan Chicken.webp",
      },
      {
        id: generateId("food", "Mulligatawny Soup"),
        name: "Mulligatawny Soup",
        price: 850,
        category: "Food",
        desc: "Classic lentil soup, aromatic spices, tender chicken bits, fragrant rice, garlic bread.",
        image: "/assets/pictures/food/Mulligatawny Soup.webp",
      },
      {
        id: generateId("food", "Penna Arrabbiata"),
        name: "Penna Arrabbiata",
        price: 1250,
        category: "Food",
        desc: "Penne pasta, Arrabiatta sauce, garlic bread.",
        image: "/assets/pictures/food/Penna Arrabbiata.webp",
      },
      {
        id: generateId("food", "Pesto Sandwich"),
        name: "The Tuscan Pesto Sandwich",
        price: 1150,
        category: "Food",
        desc: "Creamy pesto generously, grilled chicken, sun-dried tomatoes, melted cheddar cheese.",
        image: "/assets/pictures/food/Pesto Sandwich.webp",
      },
      {
        id: generateId("food", "Philly Cheesesteak Sandwich"),
        name: "Philly Cheesesteak Sandwich",
        price: 1450,
        category: "Food",
        desc: "Sliced pan-seared beef, sautéed onions, green capsicum, jalapeños, cheddar & mozzarella cheese, on a toasted submarine roll.",
        image: "/assets/pictures/food/Philly Cheesesteak Sandwich.webp",
      },
      {
        id: generateId("food", "Ramen"),
        name: "Ramen Bowl",
        price: 1350,
        category: "Food",
        desc: "Chinese-style noodles, spicy broth with your choice of meat, a hard-boiled egg, fried ginger, garlic, green onion.",
        image: "/assets/pictures/food/Ramen.webp",
      },
      {
        id: generateId("food", "Roasted Tomato Soup"),
        name: "Roasted Tomato Soup",
        price: 850,
        category: "Food",
        desc: "Roasted tomato, roasted garlic, basil, sour cream, garlic bread.",
        image: "/assets/pictures/food/Roasted Tomato Soup.webp",
      },
      {
        id: generateId("food", "Sour Cream Jacket Potato"),
        name: "Sour Cream Jacket Potato",
        price: 950,
        category: "Food",
        desc: "Baked potato split open with butter and in-house sour cream.",
        image: "/assets/pictures/food/Sour Cream Jacket Potato.webp",
      },
      {
        id: generateId("food", "Spicy Seafood Linguine"),
        name: "Spicy Seafood Linguine",
        price: 1650,
        category: "Food",
        desc: "Linguine pasta, sautéed prawns, spicy garlic-infused butter-base, cherry tomatoes, garlic bread.",
        image: "/assets/pictures/food/Spicy Seafood Linguine.webp",
      },
      {
        id: generateId("food", "Sticky Toffee Pudding"),
        name: "Sticky Toffee Pudding",
        price: 950,
        category: "Food",
        desc: "Warm date sponge drenched in toffee sauce with a scoop of vanilla ice cream",
        image: "/assets/pictures/food/Sticky Toffee Pudding.webp",
      },
    ],
  },
  {
    category: "Desserts",
    slug: "desserts",
    heroImage: "/assets/pictures/menu/Desserts.webp",
    items: [
      {
        id: generateId("desserts", "Apple Crumble"),
        name: "Apple Crumble",
        price: 950,
        category: "Desserts",
        desc: "",
        image: "/assets/pictures/dessert/Apple Crumble.webp",
      },
      {
        id: generateId("desserts", "Bread Pudding"),
        name: "Bread Pudding",
        price: 850,
        category: "Desserts",
        desc: "",
        image: "/assets/pictures/dessert/Bread Pudding.webp",
      },
      {
        id: generateId("desserts", "Brownie Cheesecake"),
        name: "Brownie Cheesecake",
        price: 1050,
        category: "Desserts",
        desc: "",
        image: "/assets/pictures/dessert/Brownie Cheesecake.webp",
      },
      {
        id: generateId("desserts", "Cookie Island"),
        name: "Cookie Island",
        price: 950,
        category: "Desserts",
        desc: "",
        image: "/assets/pictures/dessert/Cookie Island.webp",
      },
      {
        id: generateId("desserts", "Lisbon Cake"),
        name: "Lisbon Cake",
        price: 850,
        category: "Desserts",
        desc: "",
        image: "/assets/pictures/dessert/Lisbon Cake.webp",
      },
      {
        id: generateId("desserts", "Molten Lava"),
        name: "Molten Lava Cake",
        price: 1150,
        category: "Desserts",
        desc: "",
        image: "/assets/pictures/dessert/Molten Lava.webp",
      },
      {
        id: generateId("desserts", "San Sebastian Cheesecake"),
        name: "San Sebastian Cheesecake",
        price: 1150,
        category: "Desserts",
        desc: "",
        image: "/assets/pictures/dessert/San Sebastian Cheesecake.webp",
      },
    ],
  },
  {
    category: "Bar",
    slug: "bar",
    heroImage: "/assets/pictures/menu/Bar.webp",
    items: [
      {
        id: generateId("bar", "Grapefruit & Apple Mockarita"),
        name: "Grapefruit & Apple Mockarita",
        price: 650,
        category: "Bar",
        desc: "",
        image: "/assets/pictures/bar/Grapefruit & Apple Mockarita.webp",
      },
      {
        id: generateId("bar", "Iced Mango Coconut Matcha"),
        name: "Iced Mango Coconut Matcha",
        price: 800,
        category: "Bar",
        desc: "",
        image: "/assets/pictures/bar/Iced Mango Coconut Matcha.webp",
      },
      {
        id: generateId("bar", "Iced Matcha Frappe"),
        name: "Iced Matcha Frappé",
        price: 750,
        category: "Bar",
        desc: "",
        image: "/assets/pictures/bar/Iced Matcha Frappe.webp",
      },
      {
        id: generateId("bar", "Iced Strawberry Matcha Cloud Latte"),
        name: "Iced Strawberry Matcha Cloud Latte",
        price: 800,
        category: "Bar",
        desc: "",
        image: "/assets/pictures/bar/Iced Strawberry Matcha Cloud Latte.webp",
      },
      {
        id: generateId("bar", "Tiramisu Affogato"),
        name: "Tiramisu Affogato",
        price: 850,
        category: "Bar",
        desc: "",
        image: "/assets/pictures/bar/Tiramisu Affogato.webp",
      },
      {
        id: generateId("bar", "Vanilla Spiced Matcha"),
        name: "Vanilla Spiced Matcha",
        price: 750,
        category: "Bar",
        desc: "",
        image: "/assets/pictures/bar/Vanilla Spiced Matcha.webp",
      },
    ],
  },
];
