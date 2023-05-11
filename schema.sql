create database donationSystem;
use donationSystem;


create table User(
    UserID varchar(10),
    name varchar(45),
    email varchar(45),
    password varchar(100),
    cardno varchar(19),
    amountdonated decimal,
    primary key(UserID)
);

create table Organisation(
	OrgID varchar(7),
    name varchar(45),
    email varchar(45),
    contactno varchar(15),
    weblink varchar(10000),
    location varchar(1000),
    primary key(OrgID)
);


create table Donations(
	DonID varchar(7),
    amount decimal,
    d datetime,
    primary key(DonID)
);

create table User_Donates(
    DonID varchar(7),
    UserID varchar(10),
    primary key(DonID,UserID),
    foreign key (DonID) references Donations(DonID),
    foreign key (UserID) references User(UserID),
);

create table Receives_Donations(
    DonID varchar(7),
    OrgID varchar(7),
    primary key(DonID,OrgID),
    foreign key (DonID) references Donations(DonID),
    foreign key (OrgID) references Organisation(OrgID)
);

