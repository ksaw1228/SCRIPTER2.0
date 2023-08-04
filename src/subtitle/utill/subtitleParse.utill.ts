export function parseSubtitle(data, fileExtension) {
  if (fileExtension === 'smi') {
    data = data.replace(/&nbsp;/gi, ' ');
    data = data.replace(/<br>/gi, '\u200B');
    data = data.replace(/<.*?>/g, '');
    data = data.replace(/ /gi, '');
    data = data.replace(/<!--[\s\S]*?-->/g, '');
    data = data.replace(/\u200B/gi, ' ');
  }

  const lines =
    fileExtension === 'srt'
      ? data.trim().split(/\r?\n\r?\n/)
      : data.split('\n');

  return lines.reduce((acc, item, index) => {
    const content =
      fileExtension === 'srt'
        ? item
            .split(/\r?\n/)
            .slice(2)
            .join(' ')
            .replace(/<\/?[^>]+(>|$)/g, '')
            .replace(/\\/g, '')
        : item.trim();

    // Check if line is a time code
    const isTimeCode =
      /^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/.test(content);
    // Check if line is a number right above a time code (in srt format)
    const isNumberAboveTimeCode =
      /^\d+$/.test(content) &&
      /^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/.test(
        lines[index + 1],
      );

    if (
      content &&
      /\S/.test(content) &&
      !isTimeCode &&
      !isNumberAboveTimeCode
    ) {
      const cleaned = content
        .replace(/<[\s\S]*?>/g, '')
        .replace(/^\([^)]*\)/, '')
        .replace(/\\"/g, '')
        .replace(/\\/g, '')
        .trim();
      if (cleaned) {
        acc.push(cleaned);
      }
    }
    return acc;
  }, []);
}
