//AMC Virtual Assistant BOT
//by Kevin Kenardi
//Last Edit 08/12/2023
//kevinrivaille29@gmail.com

const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { Configuration, OpenAIApi } = require('openai');
const { config } = require('dotenv');
const fs = require('fs');
const { send } = require('process');
let status = '';
const customerStatus = {}; // Untuk cek status tiap pelanggan biar gk ketimpa


config();

//CHAT GPT API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//LOCAL AUTH CLIENT BIAR GK PERLU LOGIN TIAP NYALAIN BOT
const client = new Client({
  authStrategy: new LocalAuth(),
});

//BUAT SCAN QR LOGIN FIRST TIME LOGIN ONLY
client.on('qr', (qr) => {
  console.log('Scan the QR code to log in:');
  qrcode.generate(qr, { small: true });
});

//ALERT KALAU CLIENT READY
client.on('ready', () => {
  console.log('Client is ready!');
});

//FUNCTION SEMUA COMMAND JADI LOWERCASE
client.on('message', async (msg) => {
  const text = msg.body.toLowerCase() || '';
  const senderId = msg.from;

  // cek status untuk setiap pelanggan
  if (!customerStatus[senderId]) {
    customerStatus[senderId] = '';
  }

  //MAIN MENU
  if (text === 'amc' && status === '' && customerStatus[senderId] === '') {
        msg.reply('Halo, perkenalkan saya Virtual Assistant AMCNet 🤖\n\nAda yang bisa saya bantu ?\n\n1. _*New Customer*_\n\n2. _*Existing Customer*_\n\n3. _*Bicara dengan Admin*_ 👩‍💻');
        status = '';
  } else if (text === '1' && status === '' && customerStatus[senderId] === '') {//show retail
        msg.reply('Silahkan pilih kebutuhan Anda :\n\n1. _*Price List Retail*_ 🏷️\n\n2. _*Price List Corporate*_ 🏷️\n\n3. _*Cara Berlangganan*_ 📄\n\n4. _*Kembali ke Menu Utama*_ ↩️');
        status ='newcustomer';
  } else if (text === '2' && status === '' && customerStatus[senderId] === '') {//show retail
        msg.reply('Silahkan pilih kebutuhan Anda :\n\n1. _*Cara Update Paket Layanan*_ 🧾\n\n2. _*Cara Pembayaran*_ 🧾\n\n3. _*Cara Ganti Password Wifi*_ 📶\n\n4. _*Keluhan*_ 👷\n\n5. _*Kembali ke Menu Utama*_ ↩️');
        status='existingcustomer';
  } else if (text === '3' && status === '' && customerStatus[senderId] === '') {//show retail
        msg.reply('Silahkan menunggu respond dari Customer Service kami dalam beberapa saat lagi.');
        sendChatMessageToGroup(msg, 'AMC ALERT');
	    status = '';
  }

  //KALAU NEW CUSTOMER
    else if (status === 'newcustomer' && customerStatus[senderId] === '') {
        if (text === '1' && status === 'newcustomer' && customerStatus[senderId] === '') {
            msg.reply('Berikut adalah list Harga AMC yang sedang berjalan :\n\n*30 Mbps -> Rp 250.000*\n*50 Mbps -> Rp 325.000*\n*70 Mbps -> Rp 475.000*\n\nNote:\nHarga di atas diluar PPN 11%\nProgram ini biasanya digunakan untuk penggunaan di rumah');
        const media = MessageMedia.fromFilePath('D:/brosuramc.jpg');
            client.sendMessage(msg.from, media);
        const pdfMedia = MessageMedia.fromFilePath('D:/stb.pdf');
            client.sendMessage(msg.from, pdfMedia);
            client.sendMessage(senderId, 'Apakah informasi ini membantu Anda ?\n\n1. _*Ya*_ ✅\n\n2. _*Tidak*_ 🚫');
        status = 'menuselesai';
      } else if (text === '2' && status === 'newcustomer' && customerStatus[senderId] === '') {//show list corporate
            msg.reply('Berikut adalah list Harga AMC yang sedang berjalan :\n\n*50 Mbps  -> Rp 475.000*\n*100 Mbps -> Rp 850.000*\n*150 Mbps -> Rp 1.100.000*\n\nNote:\nHarga di atas diluar PPN 11%\nProgram ini biasanya digunakan untuk penggunaan kantor / small office');
            client.sendMessage(senderId, 'Apakah informasi ini membantu Anda ?\n\n1. _*Ya*_ ✅\n\n2. _*Tidak*_ 🚫');
        status = 'menuselesai';
      } else if (text === '3' && status === 'newcustomer' && customerStatus[senderId] === '') {//cara berlangganan
            msg.reply('_*Cara Berlangganan*_\n\n1. Pastikan sudah tahu paket / layanan yang sudah diinginkan\n\n2. Mengisi Link Formulir berlangganan berikut:\n\n  http://bit.ly/BerlanggananAMC\n\n3. Jika Formulir sudah diisi, harap menunggu konfirmasi dari Admin untuk jadwal instalasi.');
            client.sendMessage(senderId, 'Apakah informasi ini membantu Anda ?\n\n1. _*Ya*_ ✅\n\n2. _*Tidak*_ 🚫');
            status = 'menuselesai';
      } else if (text === '4' && status === 'newcustomer' && customerStatus[senderId] === '') {
            msg.reply('Halo, perkenalkan saya Virtual Assistant AMCNet 🤖\n\nAda yang bisa saya bantu ?\n\n1. _*New Customer*_\n\n2. _*Existing Customer*_\n\n3. _*Bicara dengan Admin*_ 👩‍💻');
            status = '';
      }else {
            msg.reply('Silahkan pilih kebutuhan Anda :\n\n1. _*Price List Retail*_ 🏷️\n\n2. _*Price List Corporate*_ 🏷️\n\n3. _*Cara Berlangganan*_ 📄\n\n4. _*Kembali ke Menu Utama*_ ↩️');
            status = 'newcustomer';
      }
  }
  
  //KALAU EXISTING CUSTOMER
    else if (status === 'existingcustomer' && customerStatus[senderId] === '') {
        if (text === '1' && status === 'existingcustomer' && customerStatus[senderId] === '') {
            msg.reply('_*Cara Update / Rubah Layanan Paket*_ 🧾\n\nSilahkan mengisi formulir berikut untuk melakukan perubahan layanan paket AMCNet :\n\nhttps://forms.gle/UurWWZjVa7R67JsS9');
            client.sendMessage(senderId, 'Apakah informasi ini membantu Anda ?\n\n1. _*Ya*_ ✅\n\n2. _*Tidak*_ 🚫');
            status = 'menuselesai';
      } else if (text === '2' && status === 'existingcustomer' && customerStatus[senderId] === '') {//cara bayar
            msg.reply('_*Cara Pembayaran*_ 🧾\n\n1. Login ke https://client.amc.net.id\n\n2. Masukkan ID Customer & Password yang dilampirkan di Invoice\n\n3. Mengikuti Langkah - Langkah Pembayaran di aplikasi Xendit\n\n4. Pada Bagian Invoice, Klik "*Bayar Disini*" (dibagian kiri atas Invoice)\n\n5. Pilih Cara Pembayaran serta bank yang dituju\n\n6. Pembayaran dapat dilakukan melalui:\n- Virtual Account (MBanking)\n- Virtual Account (ATM)\n- QRIS');
            client.sendMessage(senderId, 'Apakah informasi ini membantu Anda ?\n\n1. _*Ya*_ ✅\n\n2. _*Tidak*_ 🚫');
            status = 'menuselesai';
      } else if (text === '3' && status === 'existingcustomer' && customerStatus[senderId] === '') {//cara ganti password wifi
            msg.reply('_*Cara Ganti Password WI-FI AMCNet*_ 📶\n\n1. Ikuti Langkah yang terdapat pada PDF dibawah ini:');
        const pdfMedia = MessageMedia.fromFilePath('D:/ubahpassword.pdf');
            client.sendMessage(msg.from, pdfMedia);
            client.sendMessage(senderId, 'Apakah informasi ini membantu Anda ?\n\n1. _*Ya*_ ✅\n\n2. _*Tidak*_ 🚫');
            status = 'menuselesai';
      } else if (text === '4' && status === 'existingcustomer' && customerStatus[senderId] === '') {//keluhan
            msg.reply('_*Keluhan / Masalah dengan layanan*_ 👷\n\n Silahkan pilih jenis keluhan Anda\n\n1. _*Keluhan Invoice*_ 🧾\n\n2. _*Keluhan Internet*_ 📶');
            status = 'keluhan';
      } else if (text === '5' && status === 'existingcustomer' && customerStatus[senderId] === '') {
            msg.reply('Halo, perkenalkan saya Virtual Assistant AMCNet 🤖\n\nAda yang bisa saya bantu ?\n\n1. _*New Customer*_\n\n2. _*Existing Customer*_\n\n3. _*Bicara dengan Admin*_ 👩‍💻');
            status = '';
      } else{
            msg.reply('Silahkan pilih kebutuhan Anda :\n\n1. _*Cara Update Paket Layanan*_ 🧾\n\n2. _*Cara Pembayaran*_ 🧾\n\n3. _*Cara Ganti Password Wifi*_ 📶\n\n4. _*Keluhan*_ 👷\n\n5. _*Kembali ke Menu Utama*_ ↩️');
            status = 'existingcustomer'
      }
  }

  //KELUHAN
  else if (status === 'keluhan' && customerStatus[senderId] === '') {
      if (text === '1' && status === 'keluhan' && customerStatus[senderId] === ''){
      msg.reply('Silahkan pilih kendala yang Anda Hadapi ?\n\n1. _*Periode Aktifasi*_ 🗓️\n\n2. _*Tidak Menerima Invoice*_ 🧾\n\n3. _*Internet ter-suspend/ter-isolir*_ ⛔\n\n4. *Lainnya* 📝\n\n5. _*Kembali ke menu utama*_ ↩️');
      status = 'keluhaninvoice'
      }
      else if (text === '2' && status === 'keluhan' && customerStatus[senderId] === ''){
        msg.reply('Silahkan pilih masalah Anda :\n\n1. _*No Internet Access*_ 📶\n\n2. _*Internet Lemot*_ 🦥\n\n3. _*Lainnya*_ 📝\n\n4. _*Kembali ke Menu Utama*_ ↩️');
        status = 'keluhaninternet'
      }
      else {
        msg.reply('_*Keluhan / Masalah dengan layanan*_ 👷\n\n Silahkan pilih jenis keluhan Anda\n\n1. _*Keluhan Invoice*_ 🧾\n\n2. _*Keluhan Internet*_ 📶');
        status = 'keluhan';
      }
  }

  //CABANG KELUHAN INVOICE
    else if (status === 'keluhaninvoice' && customerStatus[senderId] === '') {
        if (text === '1' && status === 'keluhaninvoice' && customerStatus[senderId] === '') {//jatuh tempo
            msg.reply('untuk melihat periode aktif / periode jatuh tempo, Anda dapat melihat hal tersebut melalui website kami di\n\nhttps://client.amc.net.id\n\n\nSilahkan Login sesuai dengan ID & Password Anda yang tertera dalam Invoice');
            client.sendMessage(senderId, 'Apakah masalah telah teratasi ?\n\n1. _*Ya*_ ✅\n\n2. _*Tidak*_ 🚫');
            status = 'masalahselesai';
      } else if (text === '2' && status === 'keluhaninvoice' && customerStatus[senderId] === '') {//gk dapet invoice
            msg.reply('Jika terdapat kendala dalam menerima _Invoice_ pada bulan ini, Anda dapat melihat hal tersebut melalui website kami di\n\nhttps://client.amc.net.id\n\n\nSilahkan Login sesuai dengan ID & Password Anda yang tertera dalam Invoice anda sebelumnya');
            client.sendMessage(senderId, 'Apakah masalah telah teratasi ?\n\n1. _*Ya*_ ✅\n\n2. _*Tidak*_ 🚫');
            status = 'masalahselesai';
      } else if (text === '3' && status === 'keluhaninvoice' && customerStatus[senderId] === '') {//terisolir
            msg.reply('Jika layanan internet Anda ter-suspend/ter-isolir, Anda dapat melihat status layanan yang berjalan melalui website kami di\n\nhttps://client.amc.net.id\n\n\nSilahkan Login sesuai dengan ID & Password Anda yang tertera dalam Invoice');
            client.sendMessage(senderId, 'Apakah masalah telah teratasi ?\n\n1. _*Ya*_ ✅\n\n2. _*Tidak*_ 🚫');
            status = 'masalahselesai';
      } else if (text === '4' && status === 'keluhaninvoice' && customerStatus[senderId] === '') {//masalah invoice lain nya
            msg.reply('Silahkan isi & kirim kembali Kendala Anda sesuai dengan format berikut\n\n*_customerID_, (kendala Anda)*\n\n_contoh :_ AC210054, Saya sudah bayar bulan ini tetapi internet nya masih tidak bisa dipakai');
            status = 'masalahcustomer';
      } else if (text === '5' && status === 'keluhaninvoice'&& customerStatus[senderId] === '') {
        // Jika pelanggan ingin kembali ke menu utama, atur ulang status
            msg.reply('Halo, perkenalkan saya Virtual Assistant AMCNet 🤖\n\nAda yang bisa saya bantu ?\n\n1. _*New Customer*_\n\n2. _*Existing Customer*_\n\n3. _*Bicara dengan Admin*_ 👩‍💻');
            status = '';
      } else {
            msg.reply('Pilihan tidak valid.\n\nSilahkan pilih kendala yang Anda Hadapi ?\n\n1. *Periode Aktifasi* 🗓️\n\n2. *Tidak Menerima Invoice* 🧾\n\n3. *Internet ter-suspend/ter-isolir* ⛔\n\n4. *Lainnya* 📝\n\n5. *Kembali ke menu utama* ↩️');
            status = 'keluhaninvoice';
      }
  }
    
  //CABANG KELUHAN INTERNET
    else if (status === 'keluhaninternet' && customerStatus[senderId] === '') {
        if (text === '1' && status === 'keluhaninternet' && customerStatus[senderId] === '') {//no internet access
            msg.reply('Jika terdapat masalah *_No Internet Access_*\n\nAnda dapat melakukan pengecekan status pembayaran invoice anda pada bulan ini\n\nJika masih tidak ada internet acess pilih gejala yang Anda hadapi pada modem :\n\n1. _*LED modem Merah*_ 🔴\n\n2. _*LED Modem Normal*_ 🟢\n\n3. _*Kembali ke Menu Utama*_ ↩️');
            status = 'LEDproblem';
      } else if (text === '2' && status === 'keluhaninternet' && customerStatus[senderId] === '') {//inet lemot
            msg.reply('Pastikan Paket yang ada pakai saat ini, merupakan paket yang sesuai dengan yang Anda pilih saat mendaftar\n\nPastikan Jarak antara wifi dan juga device yang dipakai tidak berjauhan/terhalang oleh beberapa tembok\n\nUntuk hasil yang maksimal, disarankan untuk menggunakan kabel _*LAN*_ agar tidak ada halangan antar koneksi\n\nJika masih terasa lemot, Anda bisa melakukan _*restart*_ pada modem Anda dan mencoba nya kembali dalam beberapa menit');
        const media = MessageMedia.fromFilePath('D:/restartmodem.jpeg');//gambar restart modem
            client.sendMessage(msg.from, media);
            client.sendMessage(senderId, 'Apakah masalah telah teratasi ?\n\n1. _*Ya*_ ✅\n\n2. _*Tidak*_ 🚫');
            status = 'masalahselesai';
      } else if (text === '3' && status === 'keluhaninternet' && customerStatus[senderId] === '') {//masalah inet lain nya
            msg.reply('Silahkan isi & kirim kembali Kendala Anda sesuai dengan format berikut\n\n*_customerID_, (kendala Anda)*\n\n_contoh :_ AC210054, Wifi nya sudah saya restart tapi masih tidak ada internetnya');
            status = 'masalahcustomer';
      } else if (text === '4' && customerStatus[senderId] === '') {//balik menu
        // Jika pelanggan ingin kembali ke menu utama, atur ulang status
            msg.reply('Halo, perkenalkan saya Virtual Assistant AMCNet 🤖\n\nAda yang bisa saya bantu ?\n\n1. _*New Customer*_\n\n2. _*Existing Customer*_\n\n3. _*Bicara dengan Admin*_ 👩‍💻');
            status = '';
      } else {
            msg.reply('Silahkan pilih masalah Anda :\n\n1. _*No Internet Access*_ 📶\n\n2. _*Internet Lemot*_ 🦥\n\n3. _*Lainnya*_ 📝\n\n4. _*Kembali ke Menu Utama*_ ↩️');
            status = 'keluhaninternet';
      }
    }

  //CABANG KELUHAN LED
    else if (status === 'LEDproblem' && customerStatus[senderId] === ''){
      if (text === '1' && status === 'LEDproblem' && customerStatus[senderId] === ''){
        msg.reply('Silahkan isi & kirim kembali Kendala Anda sesuai dengan format berikut\n\n*_customerID_, (kendala Anda)*\n\n_contoh :_ AC210054, Wifi nya sudah saya restart tapi masih tidak ada internetnya');
        status = 'masalahcustomer';
      }
      else if (text === '2' && status === 'LEDproblem' && customerStatus[senderId] === '') {//LED modem normal
        msg.reply('Silahkan *Matikan* modem Anda selama beberapa menit\n\nLalu *nyalakan* modem Anda kembali dalam beberapa menit');
        const media = MessageMedia.fromFilePath('D:/restartmodem.jpeg');//gambar restart modem
          client.sendMessage(msg.from, media);
          client.sendMessage(senderId, 'Apakah masalah telah teratasi ?\n\n1. _*Ya*_ ✅\n\n2. _*Tidak*_ 🚫');
        status = 'masalahselesai';
      }
      else if (text === '3' && status === 'LEDproblem' && customerStatus[senderId] === ''){
        msg.reply('Halo, perkenalkan saya Virtual Assistant AMCNet 🤖\n\nAda yang bisa saya bantu ?\n\n1. _*New Customer*_\n\n2. _*Existing Customer*_\n\n3. _*Bicara dengan Admin*_ 👩‍💻')
        status = '';
      }
      else{
          msg.reply('Silahkan pilih gejala yang Anda hadapi pada modem :\n\n1. _*LED modem Merah*_ 🔴\n\n2. _*LED Modem Normal*_ 🟢\n\n3. _*Kembali ke Menu Utama*_ ↩️')
        status === 'LEDproblem';
      }
    }
  
  // MASALAH CUSTOMER - ID
    else if (status === 'masalahcustomer' && customerStatus[senderId] === '') {//isi cust ID
    msg.reply('Terima Kasih telah mengirimkan pesan masalah anda, Silahkan menunggu respond dari Customer Service kami dalam beberapa saat lagi.');
    sendChatMessageToGroup(msg, 'AMC ALERT');
	  status = '';
    }

  // APAKAH MENU INI MEMBANTU ?
  else if (status === 'menuselesai' && customerStatus[senderId] === '') {//ya kalau udh, tidak kalau belum
    if (text === '1' && status === 'menuselesai' && customerStatus[senderId] === ''){
      msg.reply('Baik, Terima Kasih telah menghubungi AMCNet 🙏\n\nSilahkan ketik *AMC* jika ingin meng-akses menu lainnya.');
      status = '';
    }
    else if (text === '2' && status === 'menuselesai' && customerStatus[senderId] === ''){
      msg.reply('Baik, Mohon menunggu sesaat lagi akan di bantu oleh Admin kami 🙏\n\nSilahkan ketik *AMC* jika ingin meng-akses menu lainnya.');
      status = '';
    }
    else {
        client.sendMessage(senderId, 'Apakah menu ini telah membantu Anda ?\n\n1. _*Ya*_ ✅\n\n2. _*Tidak*_ 🚫');
        status = 'menuselesai';
    }
  }

  // APAKAH MASALAH SUDAH SELESAI ?
    else if (status === 'masalahselesai' && customerStatus[senderId] === '') {//ya kalau udh, tidak kalau belum
      if (text === '1' && status === 'masalahselesai' && customerStatus[senderId] === ''){
        msg.reply('Baik, Terima Kasih telah menghubungi AMCNet 🙏\n\nSilahkan ketik *AMC* jika ingin meng-akses menu lainnya.');
        status = '';
      }
      else if (text === '2' && status === 'masalahselesai' && customerStatus[senderId] === ''){
        msg.reply('Baik, Mohon menunggu sesaat lagi akan di bantu oleh Admin kami 🙏\n\nSilahkan ketik *AMC* jika ingin meng-akses menu lainnya.');
        status = '';
      }
      else {
          client.sendMessage(senderId, 'Apakah masalah telah teratasi ?\n\n1. _*Ya*_ ✅\n\n2. _*Tidak*_ 🚫');
          status = 'masalahselesai';
      }
    }  

    //CHAT GPT CODE
  else {
    msg.reply('Halo, perkenalkan saya Virtual Assistant AMCNet 🤖\n\nAda yang bisa saya bantu ?\n\n1. _*New Customer*_\n\n2. _*Existing Customer*_\n\n3. _*Bicara dengan Admin*_ 👩‍💻');
    status = '';
  }

});

//FUNCTION ALERT BOT



//ALERT BOT WA YAYAT
async function sendChatMessageYayat(msg) {
  try {
    const contacts = await client.getContacts();
    const contact = contacts.find(({ name }) => name === 'Yayat | AMC');

    if (contact) {
      const chatId = contact.id._serialized;
      const customerMessage = msg.body; // Mengambil pesan dari customer
      await client.sendMessage(chatId, customerMessage); // Kirim Pesan ke Kontak Yayat
    } else {
      console.log('Kontak "Yayat | AMC" tidak ditemukan.');
    }
  } catch (error) {
    console.error('Error saat mengirim pesan:', error);
  }
}

//ALERT BOT WA KEVIN
async function sendChatMessageKevin(msg) {
  try {
    const contacts = await client.getContacts();
    const contact = contacts.find(({ name }) => name === 'Kevin Kenardi');

    if (contact) {
      const chatId = contact.id._serialized;
      const customerMessage = msg.body; // Mengambil pesan dari customer
      await client.sendMessage(chatId, customerMessage); // Kirim Pesan ke Kontak Kevin
    } else {
      console.log('Kontak "Kevin Kenardi" tidak ditemukan.');
    }
  } catch (error) {
    console.error('Error saat mengirim pesan:', error);
  }
}

//ALERT BOT WA IPHONE KEVIN
async function sendChatMessageKevin2(msg) {
  try {
    const contacts = await client.getContacts();
    const contact = contacts.find(({ name }) => name === 'Kevin Kenardi 2');

    if (contact) {
      const chatId = contact.id._serialized;
      const customerMessage = msg.body; // Mengambil pesan dari customer
      await client.sendMessage(chatId, customerMessage); // Kirim Pesan ke Kontak Kevin
    } else {
      console.log('Kontak "Kevin 2 Tidak ditemukan" tidak ditemukan.');
    }
  } catch (error) {
    console.error('Error saat mengirim pesan:', error);
  }
}


//ALERT BOT WA GROUP
async function sendChatMessageToGroup(msg, groupName) {
  try {
    const groups = await client.getChats();
    const group = groups.find((chat) => chat.isGroup && chat.name === groupName);

    if (group) {
      const groupId = group.id._serialized;
      const customerMessage = msg.body; // Mengambil pesan dari customer
      await client.sendMessage(groupId, customerMessage); // Mengirim pesan customer ke grup
    } else {
      console.log(`Grup dengan nama "${groupName}" tidak ditemukan.`);
    }
  } catch (error) {
    console.error('Error saat mengirim pesan:', error);
  }
}

//msg.reply('Sedang Memproses...');
  //const response = await openai.createCompletion({
    //model: 'text-davinci-003',
    //prompt: text,
    //max_tokens: 3000,
    //temperature: 0.3,
    //top_p: 1.0,
    //presence_penalty: 0.0,
    //frequency_penalty: 0.0,
  //});
  //const gptResponse = response.data.choices[0].text.trim();
  //client.sendMessage(msg.from, gptResponse); // Kirim balasan GPT-3 ke nomor yang mengirim pesan
  //status = '';


//msg.reply('1. Pastikan Paket yang ada pakai saat ini, merupakan paket yang sesuai dengan yang Anda pilih saat mendaftar\n\n2. Pastikan Jarak antara wifi dan juga device yang dipakai tidak berjauhan/terhalang oleh beberapa tembok\n\n3. Untuk hasil yang maksimal, disarankan untuk menggunakan kabel _LAN_ agar tidak ada halangan antar koneksi\n\n4. Jika masih terasa lemot, Anda bisa melakukan _restart_ pada modem Anda dan mencoba nya kembali dalam beberapa menit');

//JALAN IN CLIENT
client.initialize();

console.log('WhatsApp bot is running.');