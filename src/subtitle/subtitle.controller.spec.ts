import { Test } from '@nestjs/testing';
import { SubtitleController } from './subtitle.controller';
import { SubtitleService } from './subtitle.service';
import { User } from '../auth/user.entity';

const exampleUser = new User();
exampleUser.id = 1;
exampleUser.username = 'exampleUsername';
exampleUser.password = 'examplePassword';
exampleUser.boards = [];
exampleUser.subtitles = [];

describe('SubtitleController 테스트', () => {
  let subtitleController: SubtitleController;
  let subtitleService: SubtitleService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SubtitleController],
      providers: [
        {
          provide: SubtitleService,
          useValue: {
            createSubtitle: jest.fn(),
            getAllMySubtitles: jest.fn(),
            findOneForScript: jest.fn(),
            updateScriptProgress: jest.fn(),
            findOneForTyping: jest.fn(),
            updateTypingProgress: jest.fn(),
            deleteSubtitleById: jest.fn(),
            getAuthorId: jest.fn(),
          },
        },
      ],
    }).compile();

    subtitleController = moduleRef.get<SubtitleController>(SubtitleController);
    subtitleService = moduleRef.get<SubtitleService>(SubtitleService);
  });

  it('createSubtitle이 올바른 매개변수로 호출되는지 확인', async () => {
    const exampleCreateSubtitleDto = {
      title: '예제 제목',
      koreanSubtitle: {
        content: '예제 한국어 자막',
        fileExtension: 'srt',
      },
      englishSubtitle: {
        content: 'Example English subtitle',
        fileExtension: 'srt',
      },
    };

    subtitleController.createSubtitle(exampleCreateSubtitleDto, exampleUser);

    expect(subtitleService.createSubtitle).toHaveBeenCalledWith(
      exampleCreateSubtitleDto,
      exampleUser,
    );
  });

  it('getAllMySubtitles이 올바른 매개변수로 호출되는지 확인', async () => {
    await subtitleController.getAllMySubtitles(exampleUser);

    expect(subtitleService.getAllMySubtitles).toHaveBeenCalledWith(exampleUser);
  });

  it('findOneForScript이 올바른 매개변수로 호출되는지 확인', async () => {
    const exampleId = 1;
    const exampleAuthorId = 1;

    subtitleService.getAuthorId = jest.fn().mockResolvedValue(exampleAuthorId);
    subtitleService.findOneForScript = jest.fn();

    await subtitleController.findOneForScript(exampleId, exampleUser);

    expect(subtitleService.findOneForScript).toHaveBeenCalledWith(exampleId);
  });

  // it('updateScriptProgress가 올바른 매개변수로 호출되는지 확인', async () => {
  //   const exampleId = 1;
  //   const exampleScriptSave = {
  //     enSubtitleProgress: 50,
  //     koSubtitleProgress: 60,
  //   };

  //   await subtitleController.updateScriptProgress(exampleId, exampleScriptSave);

  //   expect(subtitleService.updateScriptProgress).toHaveBeenCalledWith(
  //     exampleId,
  //     exampleScriptSave,
  //   );
  // });

  it('findOneForTyping이 올바른 매개변수로 호출되는지 확인', async () => {
    const exampleId = 1;
    const exampleAuthorId = 1;

    subtitleService.getAuthorId = jest.fn().mockResolvedValue(exampleAuthorId);
    subtitleService.findOneForTyping = jest.fn();

    await subtitleController.findOneForTyping(exampleId, exampleUser);

    expect(subtitleService.findOneForTyping).toHaveBeenCalledWith(exampleId);
  });

  // it('updateTypingProgress가 올바른 매개변수로 호출되는지 확인', async () => {
  //   const exampleId = 1;
  //   const exampleTypingSaveDto = {
  //     id: 1,
  //     progress: 0,
  //     typedWords: '',
  //   };

  //   await subtitleController.updateTypingProgress(
  //     exampleId,
  //     exampleTypingSaveDto,
  //   );

  //   expect(subtitleService.updateTypingProgress).toHaveBeenCalledWith(
  //     exampleId,
  //     exampleTypingSaveDto,
  //   );
  // });

  it('deleteSubtitle이 올바른 매개변수로 호출되는지 확인', async () => {
    const exampleId = 1;
    const exampleAuthorId = 1;

    subtitleService.getAuthorId = jest.fn().mockResolvedValue(exampleAuthorId);
    subtitleService.deleteSubtitleById = jest.fn();

    await subtitleController.deleteSubtitle(exampleId, exampleUser);

    expect(subtitleService.deleteSubtitleById).toHaveBeenCalledWith(exampleId);
  });
});
