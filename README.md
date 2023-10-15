# backend-booking

**jangan lupa "npm install"**

**kemudian** 
buat file .env
copy semua data yang ada di file .env.dev ke file .env
kemudian ganti :

>DATABASE_URL="postgresql://hilmi:12November2000@127.0.0.1:5432/testing?schema=public"

dengan user,password,port,database dan jenis database yang di gunakan

contoh =

user : abdul,
password:123,
database:test,
port:3366,
jenis database :postgresql.

jadi seperti ini =

>DATABASE_URL="postgresql://abdul:123@127.0.0.1:3366/test?schema=public"

**127.0.0.1** ini bisa di ganti jadi **localhost**

## apa bila anda bukan menggunakan **postgresql**
**maka lakukan** =
>npx prisma init --datasource-provider mysql

*kemudian lihat* di **schema.prisma** di bagian provider apakah sudah **mysql**

## apa bila hendak membuat **table database** 
silahkan buat model baru di **schema.prisma** tersebut
*kemudian* lakukan pada terminal anda =

>npx prisma generate

*kemudian* lakukan 

>npx prisma db push

untuk membuat table yang sudah di buat di model **schema.prisma**

*kemudian*=
>npx prisma studio

untuk melihat database dan table yang sudah jadi

apa bila hendak membuat table baru maka buat model baru di *schema.prisma*
kemudian lakukan *npx prisma db push*
