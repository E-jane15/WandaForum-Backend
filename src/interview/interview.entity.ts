

// // interview.entity.ts
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
// // import { Candidate } from './candidate.entity';
// import { Interviewer } from 'src/interview/interviewer.entity';
// import { InterviewService } from './interview.service';
// import { MockInterviewService } from '../mock-interview/mock-interview.service';

// @Entity('interviews')  // This is the table in the database
// export class Interview {
//   @PrimaryGeneratedColumn()  // This will be the unique ID for each interview
//   id: number;

//   @Column()  // Date of the interview
//   date: Date;

//   @Column()  // Status of the interview (e.g., Scheduled, Completed)
//   status: string;

//   @ManyToOne(() => RTCIceCandidate, (candidate) => RTCIceCandidate.MockInterviewService)
//   @JoinColumn({ name: 'candidate_id' })
//   candidate: RTCIceCandidate;

//   @ManyToOne(() => Interviewer, (interviewer) => interviewer.interviews)
//   @JoinColumn({ name: 'interviewer_id' })
//   interviewer: Interviewer;
// }


