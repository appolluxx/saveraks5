const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function importStudentsFromExcel() {
  try {
    console.log('Starting student import...');
    
    // Read Excel file
    const XLSX = require('xlsx');
    const workbook = XLSX.readFile('../student list.xlsx');
    const worksheet = workbook.Sheets[0];
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    console.log(`Found ${data.length} student records`);
    
    let imported = 0;
    let skipped = 0;
    
    for (const row of data) {
      try {
        // Map Excel columns to database fields
        const studentId = String(row['เลขปจต.'] || '').trim();
        const numberInClass = row['เลขที่'] ? parseInt(row['เลขที่']) : null;
        const prefix = row['คำนำหน้า'] || null;
        const firstName = row['ชื่อ'] || '';
        const lastName = row['นามสกุล'] || '';
        const grade = parseInt(row['ชั้น']) || null;
        const room = parseInt(row['ห้อง']) || null;
        
        // Skip rows with missing required data
        if (!studentId || !firstName || !lastName || !grade || !room) {
          skipped++;
          continue;
        }
        
        // Insert into database
        await prisma.studentsMaster.create({
          data: {
            studentId,
            numberInClass,
            prefix,
            firstName,
            lastName,
            grade,
            room,
            isRegistered: false,
            registeredAt: null,
          }
        });
        
        imported++;
        
        if (imported % 100 === 0) {
          console.log(`Imported ${imported} records...`);
        }
      } catch (error) {
        console.error(`Error importing row ${studentId}:`, error);
        skipped++;
      }
    }
    
    console.log(`Import complete: ${imported} imported, ${skipped} skipped`);
    
  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importStudentsFromExcel();
