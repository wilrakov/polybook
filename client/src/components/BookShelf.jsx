import { useRef, useEffect, useState } from "react";
import { BookCard } from "./BookCard";

const books = [
  {
    "cover": "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop",
    "genre": "Fantasy",
    "title": "The Lost Kingdom",
    "description": "An epic adventure in a magical world full of mysteries.",
    "pages": 320,
    "totalDuration": "10h 30m",
    "rating": 4.5
  },
  {
    "cover": "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop",
    "genre": "Science Fiction",
    "title": "Interstellar Journey",
    "description": "A journey through stars and unknown worlds.",
    "pages": 280,
    "totalDuration": "8h 45m",
    "rating": 4.2
  },
  {
    "cover": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    "genre": "Mystery",
    "title": "Night Investigation",
    "description": "A series of mysterious murders in a dark city.",
    "pages": 350,
    "totalDuration": "11h 00m",
    "rating": 4.8
  },
  {
    "cover": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop",
    "genre": "Romance",
    "title": "Whispers of the Heart",
    "description": "A love story that transcends time and space.",
    "pages": 290,
    "totalDuration": "9h 15m",
    "rating": 4.3
  },
  {
    "cover": "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    "genre": "Thriller",
    "title": "The Silent Witness",
    "description": "A gripping tale of espionage and betrayal.",
    "pages": 310,
    "totalDuration": "10h 00m",
    "rating": 4.6
  },
  {
    "cover": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    "genre": "Historical Fiction",
    "title": "Echoes of the Past",
    "description": "A journey through the pivotal moments of history.",
    "pages": 330,
    "totalDuration": "11h 30m",
    "rating": 4.4
  },
  {
    "cover": "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    "genre": "Adventure",
    "title": "Beyond the Horizon",
    "description": "An expedition into the unknown wilderness.",
    "pages": 300,
    "totalDuration": "9h 45m",
    "rating": 4.7
  },
  {
    "cover": "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    "genre": "Fantasy",
    "title": "Dragons of the East",
    "description": "A tale of ancient dragons and mystical lands.",
    "pages": 340,
    "totalDuration": "12h 00m",
    "rating": 4.5
  },
  {
    "cover": "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=600&fit=crop",
    "genre": "Science Fiction",
    "title": "Mars Chronicles",
    "description": "The first human colony on Mars faces unforeseen challenges.",
    "pages": 280,
    "totalDuration": "8h 30m",
    "rating": 4.2
  },
  {
    "cover": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    "genre": "Mystery",
    "title": "The Vanishing Point",
    "description": "A detective's quest to solve a perplexing disappearance.",
    "pages": 320,
    "totalDuration": "10h 15m",
    "rating": 4.6
  },
  {
    "cover": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    "genre": "Romance",
    "title": "Starlit Nights",
    "description": "A love blossoming under the night sky.",
    "pages": 270,
    "totalDuration": "8h 00m",
    "rating": 4.3
  },
  {
    "cover": "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&h=600&fit=crop",
    "genre": "Thriller",
    "title": "The Final Countdown",
    "description": "A race against time to prevent a global catastrophe.",
    "pages": 310,
    "totalDuration": "10h 30m",
    "rating": 4.7
  },
  {
    "cover": "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop",
    "genre": "Historical Fiction",
    "title": "The Last Empress",
    "description": "The rise and fall of a powerful dynasty.",
    "pages": 330,
    "totalDuration": "11h 15m",
    "rating": 4.4
  },
  {
    "cover": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    "genre": "Adventure",
    "title": "Island of Secrets",
    "description": "An expedition to uncover hidden treasures.",
    "pages": 300,
    "totalDuration": "9h 30m",
    "rating": 4.6
  },
  {
    "cover": "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400&h=600&fit=crop",
    "genre": "Fantasy",
    "title": "Wizards' War",
    "description": "A battle between ancient magical factions.",
    "pages": 340,
    "totalDuration": "12h 15m",
    "rating": 4.5
  },
  {
    "cover": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    "genre": "Science Fiction",
    "title": "Galactic Odyssey",
    "description": "Exploring the far reaches of the galaxy.",
    "pages": 280,
    "totalDuration": "8h 45m",
    "rating": 4.2
  },
  {
    "cover": "https://images.unsplash.com/photo-1510172951991-856a654063f9?w=400&h=600&fit=crop",
    "genre": "Mystery",
    "title": "The Secret Code",
    "description": "Deciphering an ancient code to uncover hidden truths.",
    "pages": 350,
    "totalDuration": "11h 30m",
    "rating": 4.8
  },
  {
    "cover": "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop",
    "genre": "Romance",
    "title": "Love's Journey",
    "description": "A couple's journey through life's challenges.",
    "pages": 290,
    "totalDuration": "9h 00m",
    "rating": 4.3
  }
]

console.log(books);


export function BookShelf() {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;

    const card = container.firstChild;

    const gap = 10;
    const scrollAmount = card.offsetWidth + gap;

    container.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleScroll = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth)
    };
    handleScroll()

    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 bg-black h-[100%] z-10 opacity-30"
        >
          scroll
        </button>
      )}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute bg-black h-[100%] z-10 opacity-30"
        >
          scroll
        </button>
      )}
      <div
        className="flex gap-2.5 overflow-x-scroll no-scrollbar"
        ref={scrollContainerRef}
      >
        {books.map((book, i) => (
          <BookCard key={i} cover={book.cover} title={book.title} description={book.description} />
        ))}
      </div>
    </div>
  );
}
