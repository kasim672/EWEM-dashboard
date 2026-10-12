import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import JSZip from 'jszip';
import manifest from '@/data/courseworkManifest.json';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const assignmentId = id.toUpperCase();

  // Find all files belonging to this assignment
  const assignmentFiles = manifest.files.filter((f) => f.assignmentId === assignmentId);

  if (!assignmentFiles || assignmentFiles.length === 0) {
    return NextResponse.json(
      { error: `No files found for assignment ${assignmentId}` },
      { status: 404 }
    );
  }

  const zip = new JSZip();

  for (const file of assignmentFiles) {
    let filePath = path.join(process.cwd(), 'coursework_vault', 'files', file.safeFilename);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(process.cwd(), 'public', 'coursework', 'files', file.safeFilename);
    }
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      zip.file(file.filename, fileBuffer);
    }
  }

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });

  return new NextResponse(zipBuffer as any, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="RECLAIM_${assignmentId}_Coursework.zip"`,
    },
  });
}
