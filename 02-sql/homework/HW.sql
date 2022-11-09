Empezemos...

sqlite> select name from movies where year = 1998;

sqlite> select count (*) name from movies where year = 1982;

sqlite> select * from actors where last_name like "%stack";

sqlite> select * from actors where last_name like "%stack" limit 20;select first_name, last_name, count (*) from actors group by lower (first_name), lower(last_name) order by count(*) desc limit 10;

sqlite> select actor_id, count(*) as total_roles from roles group by actor_id order by total_roles desc limit 100;

sqlite> select genre, count(*) as total_movies from movies_genres group by genre order by total_movies;

sqlite> select first_name, last_name from actors join roles on actors.id = roles.actor_id join movies on movies.id = roles.movie_id where name = 'Braveheart' and year = 1995 order by last_name;

select directors.first_name, directors.last_name, movies.name, movies.year from directors join movies_directors on directors.id = movies_directors.director_id join movies_genres on movies_directors.movie_id = movies_genres.movie_id join movies on movies_genres.movie_id = movies.id where genre = 'Film-Noir' and movies.year % 4 = 0 order by movies.name;

select  actors.first_name, actors.last_name, movies.name as title 
from actors 
join roles on actors.id =roles.actor_id 
join movies on roles.movie_id = movies.id 
join movies_genres on movies.id = movies_genres.movie_id 
where genre = 'Drama' 
and movies.id in 
(select movie_id 
from roles 
join actors on roles.actor_id = actors.id 
where first_name = 'Kevin' and last_name = 'Bacon') 
and (first_name || ' ' ||last_name) != 'Kevin Bacon';


select DISTINCT first_name, last_name 
from actors
where actors.id in (
    select actor_id
    from roles
    join movies on roles.movie_id = movies.id
    where year < 1900
) and actors.id in(
    select actor_id
    from roles
    join movies on roles.movie_id = movies.id
    where year > 2000
);

select actors.first_name,actors.last_name,movies.name as title, count (distinct role) as roles
from actors
join roles on actors.id = roles.actor_id
join movies on roles.movie_id = movies.id
where movies.year > 1990
group by actors.id, movies.id
having roles >= 5;

SELECT year, count (*) as total_movies
from movies
where id not in (
    select movie_id
    from roles
    join actors on roles.actor_id = actors.id
    where actors.gender = 'M'
)
group by year
order by year;

Birthyear
Buscá todas las películas filmadas en el año que naciste.

1982
Cuantas películas hay en la DB que sean del año 1982?

Stacktors
Buscá actores que tengan el substring stack en su apellido.

Fame Name Game
Buscá los 10 nombres y apellidos más populares entre los actores. Cuantos actores tienen cada uno de esos nombres y apellidos?

Esta consulta puede involucrar múltiples queries.

Prolific
Listá el top 100 de actores más activos junto con el número de roles que haya realizado.

Bottom of the Barrel
Cuantas películas tiene IMDB por género? Ordená la lista por el género menos popular.

Braveheart
Listá el nombre y apellido de todos los actores que trabajaron en la película "Braveheart" de 1995, ordená la lista alfabéticamente por apellido.

Leap Noir
Listá todos los directores que dirigieron una película de género 'Film-Noir' en un año bisiesto (para reducir la complejidad, asumí que cualquier año divisible por cuatro es bisiesto). Tu consulta debería devolver el nombre del director, el nombre de la peli y el año. Todo ordenado por el nombre de la película.

° Bacon
Listá todos los actores que hayan trabajado con Kevin Bacon en películas de Drama (incluí el título de la peli). Excluí al señor Bacon de los resultados.