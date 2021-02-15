jest.mock('./pdfkit.standalone');

import { ParsedQuillDelta } from 'quilljs-parser';
import PDFDocument from './pdfkit.standalone';
import { MockPDFDocument } from './test-utilities';
import { default as exporter } from './pdf-exporter';

const mockPdfKit = PDFDocument as jest.MockedClass<typeof PDFDocument>;

let activeMock: any;

mockPdfKit.mockImplementation(() => {
    const doc = new MockPDFDocument();
    activeMock = doc;
    return doc as any;
});

describe('integration', () => {

    it('should', async () => {

        const fakeDelta: ParsedQuillDelta = {
            setup: {
                hyperlinks: [],
                numberedLists: 0
            },
            paragraphs: [{
                textRuns: [{
                    text: "hello there"
                }]
            }]
        };
        exporter.generatePdf(fakeDelta);
        console.log(activeMock);

    });

});