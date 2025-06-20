This applications was developed using Ionic+Angular

## How to install

To install all dependencies you must use the command:

```bash
    npm install
```

You will need the ionic CLI to run the application so if you dont have it yet use this command to install it.

```bash
    npm install -g @ionic/cli
```

## How to run

After installing all dependencies run the command:

```bash
    ionic serve
```

## How it works

**Pokemon list**: To get a list with all the pokemons I used the free PokeAPI to get all pokemons information.

**pagination**: To paginate every information every time I request the api I keep the previous and next link that comes from the api so I can use it to get the next list or previous list of pokemons.

**pokemons's information**: To keep the information of every pokemon I created a injectable class DataStorager that is responsible to keep the information that comes from the API. This class have almost all of its atributes and methods as private only the get and update function are public, every time a new batch of pokemon is request the DataStorager is updated with the new information using the update function.

**favorites list**: To keep the information of pokemons seted as favorite I created another injectable class FavoriteStorager responsible to keep the list of favorites pokemon. The list atribute is private so It can have a little more security thanks to encapsulation.

**data handler**: To manage the data storagers I create the class DataHandler, it's responsabilite is to be the connection between the storagers and the main page.

## Futures upgrades

This repositorie still lacks some features like search for pokemon by name and type that I plan to release in the future together with some optimization in the API consume method. The current consume method for the API is making requests to frequently, so I plan to reduce that by getting all the necessary information when the sites loads and keep that information stored so I wont need to request to the API anymore.

## final considerations
This application was my first connection with angular and ionic so I would it was a pretty good start, thanks to my experience with NestJS I could easily grasp how the Ionic+Angular works.
