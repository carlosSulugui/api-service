create table providers(
    id varchar(255) not null primary key default (uuid()),
    name varchar(50) not null,
    phone varchar(50) not null,
    address varchar(50) not null,
    photo blob not null,
    weight int not null,
    status varchar(50) not null,
    price float,
    task_id varchar(50) not null default (uuid()),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);


drop table tasks;
drop table providers;
drop table pigs;


select * from providers;
select * from tasks;
create table tasks(
    id varchar(255) not null primary key default (uuid()),
    name varchar(50) not null,
    address varchar(50) not null,
    status varchar(50) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);


create table pigs(
    id varchar(255) not null primary key default (uuid()),
    photo blob not null,
    price varchar(50) not null,
    weight varchar(50) not null,
    status varchar(50) not null,
    user_id varchar(225) default (uuid())
);



drop trigger obtener_id_despues_insert;

-- Crear el trigger
DELIMITER $$
CREATE TRIGGER obtener_id_despues_insert
    AFTER INSERT ON providers
    FOR EACH ROW
BEGIN
    -- Insertar el nuevo ID en la tabla id_almacenado
    INSERT INTO pigs (pigs.photo, pigs.price, pigs.weight, pigs.status, pigs.user_id) VALUES (NEW.photo, NEW., NEW.id);
END;
$$
DELIMITER ;


-- motrar  los provedores y hacer un join con los pigs
select * from providers;
select * from pigs;
select * from tasks;





-- join entre el provedor y el pig
select
    providers.id as id_pro,
    providers.name as name  , pigs.id ,
    pigs.photo
from
    pigs  inner join providers on  providers.id = pigs.user_id