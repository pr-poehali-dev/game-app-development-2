import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface Game {
  id: number;
  title: string;
  platform: string;
  genre: string;
  rating: number;
  year: number;
  image: string;
  description: string;
  downloadUrl: string;
  size: string;
}

const gamesData: Game[] = [
  { id: 1, title: 'God of War', platform: 'PSP', genre: 'Экшен', rating: 9.2, year: 2008, image: 'https://cdn.poehali.dev/projects/57aa85cf-f6c1-45a0-8a83-b8fb972235fe/files/76583ddc-178f-4788-9e24-b0cff17c1a17.jpg', description: 'Эпическое приключение Кратоса', downloadUrl: '#', size: '1.2 GB' },
  { id: 2, title: 'Grand Theft Auto: Vice City Stories', platform: 'PSP', genre: 'Экшен', rating: 8.7, year: 2006, image: 'https://cdn.poehali.dev/projects/57aa85cf-f6c1-45a0-8a83-b8fb972235fe/files/265a0e18-b236-46bc-be62-52d54f74b80f.jpg', description: 'Криминальная сага в Vice City', downloadUrl: '#', size: '950 MB' },
  { id: 3, title: 'Metal Gear Solid: Peace Walker', platform: 'PSP', genre: 'Стелс', rating: 9.0, year: 2010, image: 'https://cdn.poehali.dev/projects/57aa85cf-f6c1-45a0-8a83-b8fb972235fe/files/4b7ecc1e-12a5-4e3d-a880-9ea6c71606a5.jpg', description: 'Тактический шпионский экшен', downloadUrl: '#', size: '1.4 GB' },
  { id: 4, title: 'Tekken 5: Dark Resurrection', platform: 'PSP', genre: 'Файтинг', rating: 8.8, year: 2006, image: '/placeholder.svg', description: 'Легендарный файтинг', downloadUrl: '#', size: '780 MB' },
  
  { id: 5, title: 'Shadow of the Colossus', platform: 'PS2', genre: 'Приключения', rating: 9.5, year: 2005, image: '/placeholder.svg', description: 'Битва с колоссами', downloadUrl: '#', size: '2.1 GB' },
  { id: 6, title: 'Grand Theft Auto: San Andreas', platform: 'PS2', genre: 'Экшен', rating: 9.7, year: 2004, image: '/placeholder.svg', description: 'Легендарная GTA', downloadUrl: '#', size: '2.5 GB' },
  { id: 7, title: 'Final Fantasy X', platform: 'PS2', genre: 'RPG', rating: 9.3, year: 2001, image: '/placeholder.svg', description: 'Японская ролевая игра', downloadUrl: '#', size: '3.2 GB' },
  { id: 8, title: 'Ratchet & Clank', platform: 'PS2', genre: 'Платформер', rating: 8.9, year: 2002, image: '/placeholder.svg', description: 'Веселый платформер', downloadUrl: '#', size: '1.8 GB' },
  
  { id: 9, title: 'The Last of Us', platform: 'PS3', genre: 'Экшен', rating: 9.8, year: 2013, image: 'https://cdn.poehali.dev/projects/57aa85cf-f6c1-45a0-8a83-b8fb972235fe/files/c038f606-9460-400b-9ada-ab3a28a1e85f.jpg', description: 'Постапокалиптическое выживание', downloadUrl: '#', size: '8.5 GB' },
  { id: 10, title: 'Uncharted 2', platform: 'PS3', genre: 'Приключения', rating: 9.6, year: 2009, image: '/placeholder.svg', description: 'Приключения кладоискателя', downloadUrl: '#', size: '7.2 GB' },
  { id: 11, title: 'Red Dead Redemption', platform: 'PS3', genre: 'Экшен', rating: 9.4, year: 2010, image: '/placeholder.svg', description: 'Дикий запад', downloadUrl: '#', size: '6.8 GB' },
  { id: 12, title: 'BioShock Infinite', platform: 'PS3', genre: 'Шутер', rating: 9.1, year: 2013, image: '/placeholder.svg', description: 'Летающий город', downloadUrl: '#', size: '9.1 GB' },
  
  { id: 13, title: 'The Legend of Zelda: Breath of the Wild', platform: 'Nintendo', genre: 'Приключения', rating: 9.9, year: 2017, image: 'https://cdn.poehali.dev/projects/57aa85cf-f6c1-45a0-8a83-b8fb972235fe/files/ed548519-fdcb-418c-b766-470edc3262a7.jpg', description: 'Открытый мир Хайрула', downloadUrl: '#', size: '14.3 GB' },
  { id: 14, title: 'Super Mario Odyssey', platform: 'Nintendo', genre: 'Платформер', rating: 9.7, year: 2017, image: '/placeholder.svg', description: 'Путешествие Марио', downloadUrl: '#', size: '5.7 GB' },
  { id: 15, title: 'Animal Crossing: New Horizons', platform: 'Nintendo', genre: 'Симулятор', rating: 9.0, year: 2020, image: '/placeholder.svg', description: 'Жизнь на острове', downloadUrl: '#', size: '6.2 GB' },
  { id: 16, title: 'Splatoon 3', platform: 'Nintendo', genre: 'Шутер', rating: 8.8, year: 2022, image: '/placeholder.svg', description: 'Красочный мультиплеер', downloadUrl: '#', size: '4.3 GB' },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('Все');
  const { toast } = useToast();

  const handleDownload = (game: Game) => {
    toast({
      title: '🎮 Скачивание началось!',
      description: `${game.title} (${game.size}) загружается...`,
    });
  };

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
              <Card key={game.id} className="game-card-hover bg-card border-primary/10 overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 relative overflow-hidden group">
                  <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                      onClick={() => handleDownload(game)}
                    >
                      <Icon name="Download" size={20} className="mr-2" />
                      Скачать бесплатно
                    </Button>
                  </div>
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
                    <span className="text-xs text-muted-foreground ml-auto">📦 {game.size}</span>
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