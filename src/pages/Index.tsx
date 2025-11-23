import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Game {
  id: number;
  title: string;
  platform: string;
  genre: string;
  rating: number;
  year: number;
  image: string;
  description: string;
}

const gamesData: Game[] = [
  { id: 1, title: 'God of War', platform: 'PSP', genre: 'Экшен', rating: 9.2, year: 2008, image: '/placeholder.svg', description: 'Эпическое приключение Кратоса' },
  { id: 2, title: 'Grand Theft Auto: Vice City Stories', platform: 'PSP', genre: 'Экшен', rating: 8.7, year: 2006, image: '/placeholder.svg', description: 'Криминальная сага в Vice City' },
  { id: 3, title: 'Metal Gear Solid: Peace Walker', platform: 'PSP', genre: 'Стелс', rating: 9.0, year: 2010, image: '/placeholder.svg', description: 'Тактический шпионский экшен' },
  { id: 4, title: 'Tekken 5: Dark Resurrection', platform: 'PSP', genre: 'Файтинг', rating: 8.8, year: 2006, image: '/placeholder.svg', description: 'Легендарный файтинг' },
  
  { id: 5, title: 'Shadow of the Colossus', platform: 'PS2', genre: 'Приключения', rating: 9.5, year: 2005, image: '/placeholder.svg', description: 'Битва с колоссами' },
  { id: 6, title: 'Grand Theft Auto: San Andreas', platform: 'PS2', genre: 'Экшен', rating: 9.7, year: 2004, image: '/placeholder.svg', description: 'Легендарная GTA' },
  { id: 7, title: 'Final Fantasy X', platform: 'PS2', genre: 'RPG', rating: 9.3, year: 2001, image: '/placeholder.svg', description: 'Японская ролевая игра' },
  { id: 8, title: 'Ratchet & Clank', platform: 'PS2', genre: 'Платформер', rating: 8.9, year: 2002, image: '/placeholder.svg', description: 'Веселый платформер' },
  
  { id: 9, title: 'The Last of Us', platform: 'PS3', genre: 'Экшен', rating: 9.8, year: 2013, image: '/placeholder.svg', description: 'Постапокалиптическое выживание' },
  { id: 10, title: 'Uncharted 2', platform: 'PS3', genre: 'Приключения', rating: 9.6, year: 2009, image: '/placeholder.svg', description: 'Приключения кладоискателя' },
  { id: 11, title: 'Red Dead Redemption', platform: 'PS3', genre: 'Экшен', rating: 9.4, year: 2010, image: '/placeholder.svg', description: 'Дикий запад' },
  { id: 12, title: 'BioShock Infinite', platform: 'PS3', genre: 'Шутер', rating: 9.1, year: 2013, image: '/placeholder.svg', description: 'Летающий город' },
  
  { id: 13, title: 'The Legend of Zelda: Breath of the Wild', platform: 'Nintendo', genre: 'Приключения', rating: 9.9, year: 2017, image: '/placeholder.svg', description: 'Открытый мир Хайрула' },
  { id: 14, title: 'Super Mario Odyssey', platform: 'Nintendo', genre: 'Платформер', rating: 9.7, year: 2017, image: '/placeholder.svg', description: 'Путешествие Марио' },
  { id: 15, title: 'Animal Crossing: New Horizons', platform: 'Nintendo', genre: 'Симулятор', rating: 9.0, year: 2020, image: '/placeholder.svg', description: 'Жизнь на острове' },
  { id: 16, title: 'Splatoon 3', platform: 'Nintendo', genre: 'Шутер', rating: 8.8, year: 2022, image: '/placeholder.svg', description: 'Красочный мультиплеер' },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('Все');

  const filteredGames = gamesData.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === 'Все' || game.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            🎮 Каталог Игр
          </h1>
          <p className="text-muted-foreground text-lg">Найди свою любимую игру среди тысяч хитов</p>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Icon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Поиск по названию, жанру или описанию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-card border-2 border-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </div>

        <Tabs defaultValue="Все" className="mb-8" onValueChange={setSelectedPlatform}>
          <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-card">
            <TabsTrigger value="Все" className="text-base py-3">Все</TabsTrigger>
            <TabsTrigger value="PSP" className="text-base py-3">PSP</TabsTrigger>
            <TabsTrigger value="PS2" className="text-base py-3">PS2</TabsTrigger>
            <TabsTrigger value="PS3" className="text-base py-3">PS3</TabsTrigger>
            <TabsTrigger value="Nintendo" className="text-base py-3">Nintendo</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredGames.length === 0 ? (
          <div className="text-center py-20">
            <Icon name="GamepadIcon" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground">Игры не найдены</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <Card key={game.id} className="game-card-hover bg-card border-primary/10 overflow-hidden cursor-pointer">
                <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 relative overflow-hidden">
                  <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary text-primary-foreground font-bold">
                      <Icon name="Star" size={14} className="mr-1" />
                      {game.rating}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="font-semibold">{game.platform}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{game.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">{game.genre}</Badge>
                    <span className="text-xs text-muted-foreground">{game.year}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{game.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Найдено игр: <span className="text-primary font-bold text-xl">{filteredGames.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
