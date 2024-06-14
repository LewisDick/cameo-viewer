import "@mantine/core/styles.css";
import { Card, Image, Grid, MantineProvider, AppShell, rem, Text, Button, ScrollArea, Group } from "@mantine/core";
import { theme } from "./theme";
import {useState, useEffect} from 'react'
import ky from "ky";

function makeUri(title: string): string {
  return title.toLowerCase().replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, '-')
}

export default function App() {
  const [movies, setMovies] = useState([] as Movie[])
  

  useEffect(() => {
    const movies: Promise<Movie[]> = ky.get("http://localhost:8080/movies").json()
    movies.then(m => setMovies(m))
  }, [])

  return <MantineProvider theme={theme}>
    <AppShell
    header={{ height: 60 }}
      padding="md">
        <AppShell.Main>
        <Grid>
        {
          movies.map(m => 
          <Grid.Col span={2} key={m.ID} style={{ minHeight: rem(80) }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image
                src={m.image_url}
                height={160}
                alt="Norway"
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{m.Title}</Text>
            </Group>
            <ScrollArea h={50}>
            {
              m.show_times.map(s => <Text>{(new Date(s.Showtime)).toLocaleString()}</Text>)
            }
            </ScrollArea>
            <a href={`https://www.picturehouses.com/movie-details/005/${m.ScheduledFilmId}/${makeUri(m.Title)}`}>
            <Button color="blue" fullWidth mt="md" radius="md">
              Book
            </Button>
            </a>
          </Card>
          </Grid.Col>)
        }
      </Grid>
        </AppShell.Main>
    </AppShell>
      
    </MantineProvider>;
}
