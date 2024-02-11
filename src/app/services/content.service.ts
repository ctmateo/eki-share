import { Injectable } from '@angular/core';
import { GetClassVideoQuery, ListClassPodcastsQuery, ListClassVideosQuery, ListClassinfographicsQuery, ModelClassPodcastFilterInput, ModelClassVideoFilterInput, ModelClassinfographicFilterInput } from '../API.service';
import { API, graphqlOperation } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  async ListClassVideos(
    filter?: ModelClassVideoFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListClassVideosQuery> {
    const statement = `query ListClassVideos($filter: ModelClassVideoFilterInput, $limit: Int, $nextToken: String) {
        listClassVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            classVideoContentModuleId
            contentModule {
              __typename
              id
              classVideo {
                __typename
                id
                classVideoContentModuleId
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                description
                name
                transcriptionUrl
                videoKey144
                videoKey480
                videoKey720
                videoKey1080
                videoTime
                resources {
                  __typename
                  nextToken
                }
                teacher {
                  __typename
                  id
                  author
                  fullName
                  descriptionProfile
                  descriptionTeaching
                  keyPhoto
                  keyVideo
                  userID
                  updatedAt
                  createdAt
                  owner
                }
                updatedAt
                createdAt
                classVideoTeacherId
              }
              reading {
                __typename
                id
                classReadingContentModuleId
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                name
                description
                keyFile
                updatedAt
                createdAt
              }
              infographic {
                __typename
                id
                contentModuleId
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                keyImage
                name
                description
                updatedAt
                createdAt
              }
              test {
                __typename
                id
                contentModuleId
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                name
                description
                isPublish
                questions {
                  __typename
                  nextToken
                }
                updatedAt
                createdAt
              }
              podcast {
                __typename
                id
                classActivityContentModuleId
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                audioKey
                name
                description
                duration
                audioTime
                teacher {
                  __typename
                  id
                  author
                  fullName
                  descriptionProfile
                  descriptionTeaching
                  keyPhoto
                  keyVideo
                  userID
                  updatedAt
                  createdAt
                  owner
                }
                updatedAt
                createdAt
                classPodcastTeacherId
              }
              capsule {
                __typename
                id
                classCapsuleID
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                description
                name
                videoKey1080
                videoKey144
                videoKey480
                videoKey720
                videoTime
                teacher {
                  __typename
                  id
                  author
                  fullName
                  descriptionProfile
                  descriptionTeaching
                  keyPhoto
                  keyVideo
                  userID
                  updatedAt
                  createdAt
                  owner
                }
                updatedAt
                createdAt
                classCapsuleTeacherId
              }
              moduleContentId
              module {
                __typename
                id
                description
                content {
                  __typename
                  nextToken
                }
                countClassByModule
                nameModule
                sortIndex
                courseModulesId
                course {
                  __typename
                  id
                  colorIcon
                  countContentByCourse
                  countModulesByCourse
                  isAvailable
                  descriptionCourse
                  goalCourse
                  keyImagePresentation
                  keyVideoPresentation
                  keyIcon
                  longDescriptionCourse
                  name
                  receiver
                  sortIndex
                  updatedAt
                  createdAt
                }
                updatedAt
                createdAt
              }
              isPublish
              sortIndex
              titleContent
              typeContent
              introWhatsapp
              nextContentID
              prevContentID
              updatedAt
              createdAt
              contentModuleClassVideoId
              contentModuleReadingId
              contentModuleInfographicId
              contentModuleTestId
              contentModulePodcastId
              contentModuleCapsuleId
            }
            description
            name
            transcriptionUrl
            videoKey144
            videoKey480
            videoKey720
            videoKey1080
            videoTime
            resources {
              __typename
              items {
                __typename
                id
                name
                resourceType
                URL
                sortIndex
                classVideoResourcesId
                updatedAt
                createdAt
              }
              nextToken
            }
            teacher {
              __typename
              id
              author
              fullName
              descriptionProfile
              descriptionTeaching
              keyPhoto
              keyVideo
              userID
              updatedAt
              createdAt
              owner
            }
            updatedAt
            createdAt
            classVideoTeacherId
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListClassVideosQuery>response.data.listClassVideos;
  }

  async ListClassPodcasts(
    filter?: ModelClassPodcastFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListClassPodcastsQuery> {
    const statement = `query ListClassPodcasts($filter: ModelClassPodcastFilterInput, $limit: Int, $nextToken: String) {
        listClassPodcasts(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            classActivityContentModuleId
            contentModule {
              __typename
              id
              classVideo {
                __typename
                id
                classVideoContentModuleId
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                description
                name
                transcriptionUrl
                videoKey144
                videoKey480
                videoKey720
                videoKey1080
                videoTime
                resources {
                  __typename
                  nextToken
                }
                teacher {
                  __typename
                  id
                  author
                  fullName
                  descriptionProfile
                  descriptionTeaching
                  keyPhoto
                  keyVideo
                  userID
                  updatedAt
                  createdAt
                  owner
                }
                updatedAt
                createdAt
                classVideoTeacherId
              }
              reading {
                __typename
                id
                classReadingContentModuleId
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                name
                description
                keyFile
                updatedAt
                createdAt
              }
              infographic {
                __typename
                id
                contentModuleId
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                keyImage
                name
                description
                updatedAt
                createdAt
              }
              test {
                __typename
                id
                contentModuleId
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                name
                description
                isPublish
                questions {
                  __typename
                  nextToken
                }
                updatedAt
                createdAt
              }
              podcast {
                __typename
                id
                classActivityContentModuleId
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                audioKey
                name
                description
                duration
                audioTime
                teacher {
                  __typename
                  id
                  author
                  fullName
                  descriptionProfile
                  descriptionTeaching
                  keyPhoto
                  keyVideo
                  userID
                  updatedAt
                  createdAt
                  owner
                }
                updatedAt
                createdAt
                classPodcastTeacherId
              }
              capsule {
                __typename
                id
                classCapsuleID
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                description
                name
                videoKey1080
                videoKey144
                videoKey480
                videoKey720
                videoTime
                teacher {
                  __typename
                  id
                  author
                  fullName
                  descriptionProfile
                  descriptionTeaching
                  keyPhoto
                  keyVideo
                  userID
                  updatedAt
                  createdAt
                  owner
                }
                updatedAt
                createdAt
                classCapsuleTeacherId
              }
              moduleContentId
              module {
                __typename
                id
                description
                content {
                  __typename
                  nextToken
                }
                countClassByModule
                nameModule
                sortIndex
                courseModulesId
                course {
                  __typename
                  id
                  colorIcon
                  countContentByCourse
                  countModulesByCourse
                  isAvailable
                  descriptionCourse
                  goalCourse
                  keyImagePresentation
                  keyVideoPresentation
                  keyIcon
                  longDescriptionCourse
                  name
                  receiver
                  sortIndex
                  updatedAt
                  createdAt
                }
                updatedAt
                createdAt
              }
              isPublish
              sortIndex
              titleContent
              typeContent
              introWhatsapp
              nextContentID
              prevContentID
              updatedAt
              createdAt
              contentModuleClassVideoId
              contentModuleReadingId
              contentModuleInfographicId
              contentModuleTestId
              contentModulePodcastId
              contentModuleCapsuleId
            }
            audioKey
            name
            description
            duration
            audioTime
            teacher {
              __typename
              id
              author
              fullName
              descriptionProfile
              descriptionTeaching
              keyPhoto
              keyVideo
              userID
              updatedAt
              createdAt
              owner
            }
            updatedAt
            createdAt
            classPodcastTeacherId
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListClassPodcastsQuery>response.data.listClassPodcasts;
  }

  async ListClassinfographics(
    filter?: ModelClassinfographicFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListClassinfographicsQuery> {
    const statement = `query ListClassinfographics($filter: ModelClassinfographicFilterInput, $limit: Int, $nextToken: String) {
        listClassinfographics(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            contentModuleId
            contentModule {
              __typename
              id
              classVideo {
                __typename
                id
                classVideoContentModuleId
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                description
                name
                transcriptionUrl
                videoKey144
                videoKey480
                videoKey720
                videoKey1080
                videoTime
                resources {
                  __typename
                  nextToken
                }
                teacher {
                  __typename
                  id
                  author
                  fullName
                  descriptionProfile
                  descriptionTeaching
                  keyPhoto
                  keyVideo
                  userID
                  updatedAt
                  createdAt
                  owner
                }
                updatedAt
                createdAt
                classVideoTeacherId
              }
              reading {
                __typename
                id
                classReadingContentModuleId
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                name
                description
                keyFile
                updatedAt
                createdAt
              }
              infographic {
                __typename
                id
                contentModuleId
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                keyImage
                name
                description
                updatedAt
                createdAt
              }
              test {
                __typename
                id
                contentModuleId
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                name
                description
                isPublish
                questions {
                  __typename
                  nextToken
                }
                updatedAt
                createdAt
              }
              podcast {
                __typename
                id
                classActivityContentModuleId
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                audioKey
                name
                description
                duration
                audioTime
                teacher {
                  __typename
                  id
                  author
                  fullName
                  descriptionProfile
                  descriptionTeaching
                  keyPhoto
                  keyVideo
                  userID
                  updatedAt
                  createdAt
                  owner
                }
                updatedAt
                createdAt
                classPodcastTeacherId
              }
              capsule {
                __typename
                id
                classCapsuleID
                contentModule {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                description
                name
                videoKey1080
                videoKey144
                videoKey480
                videoKey720
                videoTime
                teacher {
                  __typename
                  id
                  author
                  fullName
                  descriptionProfile
                  descriptionTeaching
                  keyPhoto
                  keyVideo
                  userID
                  updatedAt
                  createdAt
                  owner
                }
                updatedAt
                createdAt
                classCapsuleTeacherId
              }
              moduleContentId
              module {
                __typename
                id
                description
                content {
                  __typename
                  nextToken
                }
                countClassByModule
                nameModule
                sortIndex
                courseModulesId
                course {
                  __typename
                  id
                  colorIcon
                  countContentByCourse
                  countModulesByCourse
                  isAvailable
                  descriptionCourse
                  goalCourse
                  keyImagePresentation
                  keyVideoPresentation
                  keyIcon
                  longDescriptionCourse
                  name
                  receiver
                  sortIndex
                  updatedAt
                  createdAt
                }
                updatedAt
                createdAt
              }
              isPublish
              sortIndex
              titleContent
              typeContent
              introWhatsapp
              nextContentID
              prevContentID
              updatedAt
              createdAt
              contentModuleClassVideoId
              contentModuleReadingId
              contentModuleInfographicId
              contentModuleTestId
              contentModulePodcastId
              contentModuleCapsuleId
            }
            keyImage
            name
            description
            updatedAt
            createdAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListClassinfographicsQuery>response.data.listClassinfographics;
  }
  async GetClassVideo(id: string): Promise<GetClassVideoQuery> {
    const statement = `query GetClassVideo($id: ID!) {
        getClassVideo(id: $id) {
          __typename
          id
          classVideoContentModuleId
          contentModule {
            __typename
            id
            classVideo {
              __typename
              id
              classVideoContentModuleId
              contentModule {
                __typename
                id
                classVideo {
                  __typename
                  id
                  classVideoContentModuleId
                  description
                  name
                  transcriptionUrl
                  videoKey144
                  videoKey480
                  videoKey720
                  videoKey1080
                  videoTime
                  updatedAt
                  createdAt
                  classVideoTeacherId
                }
                reading {
                  __typename
                  id
                  classReadingContentModuleId
                  name
                  description
                  keyFile
                  updatedAt
                  createdAt
                }
                infographic {
                  __typename
                  id
                  contentModuleId
                  keyImage
                  name
                  description
                  updatedAt
                  createdAt
                }
                test {
                  __typename
                  id
                  contentModuleId
                  name
                  description
                  isPublish
                  updatedAt
                  createdAt
                }
                podcast {
                  __typename
                  id
                  classActivityContentModuleId
                  audioKey
                  name
                  description
                  duration
                  audioTime
                  updatedAt
                  createdAt
                  classPodcastTeacherId
                }
                capsule {
                  __typename
                  id
                  classCapsuleID
                  description
                  name
                  videoKey1080
                  videoKey144
                  videoKey480
                  videoKey720
                  videoTime
                  updatedAt
                  createdAt
                  classCapsuleTeacherId
                }
                moduleContentId
                module {
                  __typename
                  id
                  description
                  countClassByModule
                  nameModule
                  sortIndex
                  courseModulesId
                  updatedAt
                  createdAt
                }
                isPublish
                sortIndex
                titleContent
                typeContent
                introWhatsapp
                nextContentID
                prevContentID
                updatedAt
                createdAt
                contentModuleClassVideoId
                contentModuleReadingId
                contentModuleInfographicId
                contentModuleTestId
                contentModulePodcastId
                contentModuleCapsuleId
              }
              description
              name
              transcriptionUrl
              videoKey144
              videoKey480
              videoKey720
              videoKey1080
              videoTime
              resources {
                __typename
                items {
                  __typename
                  id
                  name
                  resourceType
                  URL
                  sortIndex
                  classVideoResourcesId
                  updatedAt
                  createdAt
                }
                nextToken
              }
              teacher {
                __typename
                id
                author
                fullName
                descriptionProfile
                descriptionTeaching
                keyPhoto
                keyVideo
                userID
                updatedAt
                createdAt
                owner
              }
              updatedAt
              createdAt
              classVideoTeacherId
            }
            reading {
              __typename
              id
              classReadingContentModuleId
              contentModule {
                __typename
                id
                classVideo {
                  __typename
                  id
                  classVideoContentModuleId
                  description
                  name
                  transcriptionUrl
                  videoKey144
                  videoKey480
                  videoKey720
                  videoKey1080
                  videoTime
                  updatedAt
                  createdAt
                  classVideoTeacherId
                }
                reading {
                  __typename
                  id
                  classReadingContentModuleId
                  name
                  description
                  keyFile
                  updatedAt
                  createdAt
                }
                infographic {
                  __typename
                  id
                  contentModuleId
                  keyImage
                  name
                  description
                  updatedAt
                  createdAt
                }
                test {
                  __typename
                  id
                  contentModuleId
                  name
                  description
                  isPublish
                  updatedAt
                  createdAt
                }
                podcast {
                  __typename
                  id
                  classActivityContentModuleId
                  audioKey
                  name
                  description
                  duration
                  audioTime
                  updatedAt
                  createdAt
                  classPodcastTeacherId
                }
                capsule {
                  __typename
                  id
                  classCapsuleID
                  description
                  name
                  videoKey1080
                  videoKey144
                  videoKey480
                  videoKey720
                  videoTime
                  updatedAt
                  createdAt
                  classCapsuleTeacherId
                }
                moduleContentId
                module {
                  __typename
                  id
                  description
                  countClassByModule
                  nameModule
                  sortIndex
                  courseModulesId
                  updatedAt
                  createdAt
                }
                isPublish
                sortIndex
                titleContent
                typeContent
                introWhatsapp
                nextContentID
                prevContentID
                updatedAt
                createdAt
                contentModuleClassVideoId
                contentModuleReadingId
                contentModuleInfographicId
                contentModuleTestId
                contentModulePodcastId
                contentModuleCapsuleId
              }
              name
              description
              keyFile
              updatedAt
              createdAt
            }
            infographic {
              __typename
              id
              contentModuleId
              contentModule {
                __typename
                id
                classVideo {
                  __typename
                  id
                  classVideoContentModuleId
                  description
                  name
                  transcriptionUrl
                  videoKey144
                  videoKey480
                  videoKey720
                  videoKey1080
                  videoTime
                  updatedAt
                  createdAt
                  classVideoTeacherId
                }
                reading {
                  __typename
                  id
                  classReadingContentModuleId
                  name
                  description
                  keyFile
                  updatedAt
                  createdAt
                }
                infographic {
                  __typename
                  id
                  contentModuleId
                  keyImage
                  name
                  description
                  updatedAt
                  createdAt
                }
                test {
                  __typename
                  id
                  contentModuleId
                  name
                  description
                  isPublish
                  updatedAt
                  createdAt
                }
                podcast {
                  __typename
                  id
                  classActivityContentModuleId
                  audioKey
                  name
                  description
                  duration
                  audioTime
                  updatedAt
                  createdAt
                  classPodcastTeacherId
                }
                capsule {
                  __typename
                  id
                  classCapsuleID
                  description
                  name
                  videoKey1080
                  videoKey144
                  videoKey480
                  videoKey720
                  videoTime
                  updatedAt
                  createdAt
                  classCapsuleTeacherId
                }
                moduleContentId
                module {
                  __typename
                  id
                  description
                  countClassByModule
                  nameModule
                  sortIndex
                  courseModulesId
                  updatedAt
                  createdAt
                }
                isPublish
                sortIndex
                titleContent
                typeContent
                introWhatsapp
                nextContentID
                prevContentID
                updatedAt
                createdAt
                contentModuleClassVideoId
                contentModuleReadingId
                contentModuleInfographicId
                contentModuleTestId
                contentModulePodcastId
                contentModuleCapsuleId
              }
              keyImage
              name
              description
              updatedAt
              createdAt
            }
            test {
              __typename
              id
              contentModuleId
              contentModule {
                __typename
                id
                classVideo {
                  __typename
                  id
                  classVideoContentModuleId
                  description
                  name
                  transcriptionUrl
                  videoKey144
                  videoKey480
                  videoKey720
                  videoKey1080
                  videoTime
                  updatedAt
                  createdAt
                  classVideoTeacherId
                }
                reading {
                  __typename
                  id
                  classReadingContentModuleId
                  name
                  description
                  keyFile
                  updatedAt
                  createdAt
                }
                infographic {
                  __typename
                  id
                  contentModuleId
                  keyImage
                  name
                  description
                  updatedAt
                  createdAt
                }
                test {
                  __typename
                  id
                  contentModuleId
                  name
                  description
                  isPublish
                  updatedAt
                  createdAt
                }
                podcast {
                  __typename
                  id
                  classActivityContentModuleId
                  audioKey
                  name
                  description
                  duration
                  audioTime
                  updatedAt
                  createdAt
                  classPodcastTeacherId
                }
                capsule {
                  __typename
                  id
                  classCapsuleID
                  description
                  name
                  videoKey1080
                  videoKey144
                  videoKey480
                  videoKey720
                  videoTime
                  updatedAt
                  createdAt
                  classCapsuleTeacherId
                }
                moduleContentId
                module {
                  __typename
                  id
                  description
                  countClassByModule
                  nameModule
                  sortIndex
                  courseModulesId
                  updatedAt
                  createdAt
                }
                isPublish
                sortIndex
                titleContent
                typeContent
                introWhatsapp
                nextContentID
                prevContentID
                updatedAt
                createdAt
                contentModuleClassVideoId
                contentModuleReadingId
                contentModuleInfographicId
                contentModuleTestId
                contentModulePodcastId
                contentModuleCapsuleId
              }
              name
              description
              isPublish
              questions {
                __typename
                items {
                  __typename
                  id
                  isAvailable
                  objectQuestion
                  questionType
                  sortIndex
                  classTestQuestionsId
                  updatedAt
                  createdAt
                }
                nextToken
              }
              updatedAt
              createdAt
            }
            podcast {
              __typename
              id
              classActivityContentModuleId
              contentModule {
                __typename
                id
                classVideo {
                  __typename
                  id
                  classVideoContentModuleId
                  description
                  name
                  transcriptionUrl
                  videoKey144
                  videoKey480
                  videoKey720
                  videoKey1080
                  videoTime
                  updatedAt
                  createdAt
                  classVideoTeacherId
                }
                reading {
                  __typename
                  id
                  classReadingContentModuleId
                  name
                  description
                  keyFile
                  updatedAt
                  createdAt
                }
                infographic {
                  __typename
                  id
                  contentModuleId
                  keyImage
                  name
                  description
                  updatedAt
                  createdAt
                }
                test {
                  __typename
                  id
                  contentModuleId
                  name
                  description
                  isPublish
                  updatedAt
                  createdAt
                }
                podcast {
                  __typename
                  id
                  classActivityContentModuleId
                  audioKey
                  name
                  description
                  duration
                  audioTime
                  updatedAt
                  createdAt
                  classPodcastTeacherId
                }
                capsule {
                  __typename
                  id
                  classCapsuleID
                  description
                  name
                  videoKey1080
                  videoKey144
                  videoKey480
                  videoKey720
                  videoTime
                  updatedAt
                  createdAt
                  classCapsuleTeacherId
                }
                moduleContentId
                module {
                  __typename
                  id
                  description
                  countClassByModule
                  nameModule
                  sortIndex
                  courseModulesId
                  updatedAt
                  createdAt
                }
                isPublish
                sortIndex
                titleContent
                typeContent
                introWhatsapp
                nextContentID
                prevContentID
                updatedAt
                createdAt
                contentModuleClassVideoId
                contentModuleReadingId
                contentModuleInfographicId
                contentModuleTestId
                contentModulePodcastId
                contentModuleCapsuleId
              }
              audioKey
              name
              description
              duration
              audioTime
              teacher {
                __typename
                id
                author
                fullName
                descriptionProfile
                descriptionTeaching
                keyPhoto
                keyVideo
                userID
                updatedAt
                createdAt
                owner
              }
              updatedAt
              createdAt
              classPodcastTeacherId
            }
            capsule {
              __typename
              id
              classCapsuleID
              contentModule {
                __typename
                id
                classVideo {
                  __typename
                  id
                  classVideoContentModuleId
                  description
                  name
                  transcriptionUrl
                  videoKey144
                  videoKey480
                  videoKey720
                  videoKey1080
                  videoTime
                  updatedAt
                  createdAt
                  classVideoTeacherId
                }
                reading {
                  __typename
                  id
                  classReadingContentModuleId
                  name
                  description
                  keyFile
                  updatedAt
                  createdAt
                }
                infographic {
                  __typename
                  id
                  contentModuleId
                  keyImage
                  name
                  description
                  updatedAt
                  createdAt
                }
                test {
                  __typename
                  id
                  contentModuleId
                  name
                  description
                  isPublish
                  updatedAt
                  createdAt
                }
                podcast {
                  __typename
                  id
                  classActivityContentModuleId
                  audioKey
                  name
                  description
                  duration
                  audioTime
                  updatedAt
                  createdAt
                  classPodcastTeacherId
                }
                capsule {
                  __typename
                  id
                  classCapsuleID
                  description
                  name
                  videoKey1080
                  videoKey144
                  videoKey480
                  videoKey720
                  videoTime
                  updatedAt
                  createdAt
                  classCapsuleTeacherId
                }
                moduleContentId
                module {
                  __typename
                  id
                  description
                  countClassByModule
                  nameModule
                  sortIndex
                  courseModulesId
                  updatedAt
                  createdAt
                }
                isPublish
                sortIndex
                titleContent
                typeContent
                introWhatsapp
                nextContentID
                prevContentID
                updatedAt
                createdAt
                contentModuleClassVideoId
                contentModuleReadingId
                contentModuleInfographicId
                contentModuleTestId
                contentModulePodcastId
                contentModuleCapsuleId
              }
              description
              name
              videoKey1080
              videoKey144
              videoKey480
              videoKey720
              videoTime
              teacher {
                __typename
                id
                author
                fullName
                descriptionProfile
                descriptionTeaching
                keyPhoto
                keyVideo
                userID
                updatedAt
                createdAt
                owner
              }
              updatedAt
              createdAt
              classCapsuleTeacherId
            }
            moduleContentId
            module {
              __typename
              id
              description
              content {
                __typename
                items {
                  __typename
                  id
                  moduleContentId
                  isPublish
                  sortIndex
                  titleContent
                  typeContent
                  introWhatsapp
                  nextContentID
                  prevContentID
                  updatedAt
                  createdAt
                  contentModuleClassVideoId
                  contentModuleReadingId
                  contentModuleInfographicId
                  contentModuleTestId
                  contentModulePodcastId
                  contentModuleCapsuleId
                }
                nextToken
              }
              countClassByModule
              nameModule
              sortIndex
              courseModulesId
              course {
                __typename
                id
                colorIcon
                countContentByCourse
                countModulesByCourse
                isAvailable
                descriptionCourse
                goalCourse
                keyImagePresentation
                keyVideoPresentation
                keyIcon
                longDescriptionCourse
                name
                receiver
                sortIndex
                modules {
                  __typename
                  nextToken
                }
                teachers {
                  __typename
                  nextToken
                }
                requirements {
                  __typename
                  nextToken
                }
                tags {
                  __typename
                  nextToken
                }
                updatedAt
                createdAt
              }
              updatedAt
              createdAt
            }
            isPublish
            sortIndex
            titleContent
            typeContent
            introWhatsapp
            nextContentID
            prevContentID
            updatedAt
            createdAt
            contentModuleClassVideoId
            contentModuleReadingId
            contentModuleInfographicId
            contentModuleTestId
            contentModulePodcastId
            contentModuleCapsuleId
          }
          description
          name
          transcriptionUrl
          videoKey144
          videoKey480
          videoKey720
          videoKey1080
          videoTime
          resources {
            __typename
            items {
              __typename
              id
              name
              resourceType
              URL
              sortIndex
              classVideoResourcesId
              updatedAt
              createdAt
            }
            nextToken
          }
          teacher {
            __typename
            id
            author
            fullName
            descriptionProfile
            descriptionTeaching
            keyPhoto
            keyVideo
            userID
            updatedAt
            createdAt
            owner
          }
          updatedAt
          createdAt
          classVideoTeacherId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetClassVideoQuery>response.data.getClassVideo;
  }
}
