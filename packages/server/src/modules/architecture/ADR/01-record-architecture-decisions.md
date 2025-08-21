# 1.  Record architecture decisions

## Context

It is necessary to save all architectural decisions in one place. Why ? Because most of the time you ask why the codebase is the way it is. You may encounter decisions you do not understand, you migth be tempted to change it but you are not sure if : 
- There is a good reasons for the code to be the way it is, and 
- The contexte has changed and some decisions no longer fits and need to be updated

If you have a log which responds to the why architectural decisions, you can go read them long after the original authors is gone and take your new decisions accordingly.

## Decision

For all architectural decisions Architecture Decision Log (ADL) is created.
All decisions will be recorded as Architecture Decision Records (ADR). 

Each ADR will be recorded inspiring [Michael Nygard template](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions), which contains following sections: 
- Context (to explain current problem or necessity, you must respond to the WHY)
- Decision (to explain the new convention with explanations, you must respond to the HOW)

- Not status, if the ADR is committed, then it must be applied. RFD still in discussion will take the form of pull request on the repo. 

## Consequences

All architectural decisions should be recorded in log.
Old decisions should be recorded as well with an approximate decision date when possible.
New decisions should be recorded on a regular basis.
New decisions should be discussed first in RFD (pull request)
It's en event append only : So add new decisions, do not update old ones.
