import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Checkbox, ControlLabel, Button, ButtonGroup, FormControl, Panel } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { addIssue, changeIssue, deleteIssue } from '../../../modules'
import Alerted from '../../../common/Alerted'
import { ajaxRequestToServer } from '../../../api'
import { encodeFile } from '../../../utils'

class MagazineAdministration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfPanel: null,
      titleMessage: null,
      titleNewMessage: null,
      englishVersion: false,
      englishNewVersion: false,
      englishTitleMessage: null,
      englishNewTitleMessage: null,
      file: null,
      fileNew: null,
      fileTitle: '',
      fileNewTitle: '',
      issueNewMessage: null,
      issueMessage: null,
    }
  }

  openPanel = (number) => {
    if (this.state.numberOfPanel == number) {
      this.setState({ numberOfPanel: null })
    } else {
      this.setState({ numberOfPanel: number })
    }
  }

  selectFile = (prefix, result) => {
    let stateForFile = {}
    if (result) {
      stateForFile[`file${prefix}Title`] = result.name
      stateForFile[`file${prefix}`] = {
        mime_type: result.type,
        content: result.content
      } 
    } else {
      stateForFile[`file${prefix}Title`] = ''
      stateForFile[`file${prefix}`] = null
    }
    this.setState(stateForFile)
  }

  changingIssue = () => {
    
  }

  creatingIssue = () => {
    const { token, rubric } = this.props,
      { englishNewVersion, fileNew, fileNewTitle } = this.state
    if (this.issueNewTitle.value == '') {
      this.setState({
        titleNewMessage: 'Вы не заполнили поле "Название экземпляра журнала"'
      })
    } else if (englishNewVersion && this.issueNewEnglishTitle.value == '') {
      this.setState({
        englishNewTitleMessage: 'Вы не заполнили поле "Название экземпляра журнала на английском языке"'
      })
    } else if (englishNewVersion && this.issueNewTitle.value == this.issueNewEnglishTitle.value) {
      this.setState({
        englishNewTitleMessage: 'Названия экземпляров журнала на русском и английском языках не должны совпадать'
      })
    } else {
      let data = { issue_title: this.issueNewTitle.value }
      if (fileNew) {
        data = { ...data, file: fileNew, file_title: fileNewTitle }
      }
      if (this.issueNewEnglishTitle.value != '') {
        data = { ...data, english_title: this.issueNewEnglishTitle.value }
      }
      data = { issue: { ...data, rubric: rubric.id } }
      ajaxRequestToServer('/issues/create', data, 'post', { 'Authorization': `Bearer ${token}` })
        .then(response => {
          if (response.status == 201) {
            this.issueNewTitle.value = ''
            this.issueNewEnglishTitle.value = ''
            this.setState({
              titleNewMessage: null,
              englishNewTitleMessage: null,
              fileNew: null,
              fileNewTitle: '',
              issueNewMessage: 'Экземпляр журнала успешно создан',
            })
            response.json().then(json => this.props.addIssue(json))
          } else if (response.status == 409) {
            response.json().then(json => {
              const { errors } = json
              if (errors.title) {
                this.setState({ titleNewMessage: errors.title })
              }
              if (errors.english_title) {
                this.setState({ englishNewTitleMessage: errors.english_title })
              }
            })
          } else {
            this.setState({ issueNewMessage: 'При создании экземляра журнала произошла неизвестная ошибка' })
          }
        })
    }
  }

  deleteIssue = () => {
    const { issue, token } = this.props
    if (confirm('Вы действительно хотите удалить данный экземляр журнала? ВНИМАНИЕ! ПРИ ЕГО УДАЛЕНИИ УДАЛЯТСЯ ВСЕ СТАТЬИ, КОТОРЫЕ ОН СОДЕРЖИТ.')) {
      const data = { issue: { id: issue.id } }
      ajaxRequestToServer('/issues/delete', data ,'delete', { 'Authorization': `Bearer ${token}` })
        .then(response => {
          if (response.status == 204) {
            this.props.deleteIssue(issue.id)
          } else {
            this.setState({ issueNewMessage: 'При удалении экземляра журнала произошла неизвестная ошибка' })
          }
        })
    }
  }

  addEnglishVesion = (prefix) => {
    let newValueOfStateVariable = {}
    newValueOfStateVariable[`english${prefix}Version`] = !this.state[`english${prefix}Version`]
    this.setState(newValueOfStateVariable)
  }

  renderPanel = (numberOfPanel, process) => {
    const { issue } = this.props,
      prefix = process == 'creating' ? 'New' : '',
      processInRussian = process == 'creating' ? 'создан' : 'изменён'

    let onChangeNameStateValues = {},
      onChangeEnglishNameStateValues = {}

    onChangeNameStateValues[`title${prefix}Message`] = null
    onChangeNameStateValues[`issue${prefix}Message`] = null

    onChangeEnglishNameStateValues[`english${prefix}TitleMessage`] = null

    return (
      <Panel
        collapsible
        expanded={this.state.numberOfPanel == numberOfPanel}
        style={{ margin: '1vh 3%' }}
      >
        <ControlLabel>Название экземпляра журнала</ControlLabel>
        <FormControl
          type="text"
          placeholder="Введите название..."
          style={{ marginBottom: '1vh' }}
          inputRef={(input) => this[`issue${prefix}Title`] = input}
          onChange={() => this.setState(onChangeNameStateValues)}
        />
        { Alerted(
          this.state[`title${prefix}Message`],
          !this.state[`title${prefix}Message`]
        )}
        <ControlLabel>Файл экземпляра</ControlLabel>
        <div
          className="fileform"
          style={{ marginBottom: '0' }}
        >
          <div className="fileformlabel">
            { this.state[`file${prefix}Title`] }
          </div>
          <div className="selectbutton">Обзор</div>
          <input
            className="upload"
            type="file"
            onChange={e => encodeFile(e, this.selectFile.bind(this, prefix))}
          />
        </div>
        <p style={{ marginTop: '0' }}>*не обязательно</p>
        {process == 'changing' && issue.filename  ? (
          <Checkbox>
            Удалить файл экземпляра журнала
          </Checkbox>
        ) : null }
        <Panel
          collapsible
          expanded={this.state[`english${prefix}Version`]}
          style={{ marginBottom: '0' }}
        >
          <ControlLabel>
            Название экземпляра журнала на английском языке
          </ControlLabel>
          <FormControl
            type="text"
            placeholder="Введите название на английском..."
            style={{ marginBottom: '1vh' }}
            inputRef={(input) => this[`issue${prefix}EnglishTitle`] = input}
            onChange={() => this.setState(onChangeEnglishNameStateValues)}
          />
          { Alerted(
            this.state[`english${prefix}TitleMessage`],
            !this.state[`english${prefix}TitleMessage`]
          )}
        </Panel>
        { Alerted(
          this.state[`issue${prefix}Message`],
          !this.state[`issue${prefix}Message`],
          this.state[`issue${prefix}Message`] == `Экземпляр журнала успешно ${processInRussian}` ? 'success' : 'danger'
        )}
        <Button
          bsStyle="warning"
          onClick={this[`${process}Issue`]}
          style={{ marginRight: '1vw' }}
        >
          { process == 'creating' ? 'Создать' : 'Изменить' }
        </Button>
        <Button
          bsStyle="warning"
          onClick={() => this.addEnglishVesion(prefix)}
        >
          { this.state[`english${prefix}Version`] ? (
            'Не добавлять английскую версию'
          ) : (
            'Добавить английскую версию'
          )}
        </Button>
      </Panel>
    )
  }

  render() {
    const { issue, rubric } = this.props
    return (
      <div>
        <h4 style={{ padding: '1vh 3% 0' }}>
          { `Управление экземплярами журнала для рубрики ${rubric.title}` }
        </h4>
        <ButtonGroup style={{padding: '0 3%'}}>
          <Button
            bsStyle="success"
            onClick={() => this.openPanel(1)}
          >
            Добавить
          </Button>
          { issue ? (
            <Button
              bsStyle="info"
              onClick={() => this.openPanel(2)}
            >
              Изменить
            </Button>
          ) : null }
          { issue ? (
            <Button
              bsStyle="danger"
              onClick={this.deleteIssue}
            >
              Удалить
            </Button>
          ) : null }
        </ButtonGroup>
        { this.renderPanel(1, 'creating') }
        { issue ? this.renderPanel(2, 'changing') : null }
      </div>
    )
  }
}

MagazineAdministration.propTypes = {
  rubric: PropTypes.shape({
    id:    PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  issue: PropTypes.shape({
    id:            PropTypes.number,
    title:         PropTypes.string,
    english_title: PropTypes.string,
    filename:      PropTypes.string,
    rubric_id:     PropTypes.number
  }),
  token:       PropTypes.string.isRequired,
  addIssue:    PropTypes.func.isRequired,
  changeIssue: PropTypes.func.isRequired,
  deleteIssue: PropTypes.func.isRequired
}

MagazineAdministration.defaultProps = {
  issue: null
}

function mapStateToProps (state) {
  return {
    token: state.session.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addIssue: bindActionCreators(addIssue, dispatch),
    changeIssue: bindActionCreators(changeIssue, dispatch),
    deleteIssue: bindActionCreators(deleteIssue, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MagazineAdministration)