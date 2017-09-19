import React, { Component } from 'react'

class MainContentEditorial extends Component {
  constructor(props) {
    super(props);
  }

  render() {
	  return(
	    <div className='lkmain' style={{textIndent: '1vw'}}>
		    <h3>
		      Уважаемый представитель редколлегии!
		    </h3>
		    <p>
		      Личный кабинет дает Вам возможность проверки статей, отправленных Вам на проверку главным редактором, а также пересписки с другими пользователями, зарегистрированными в системе.
		    </p>
		    <p>
		      В разделе <b>"Публикации"</b> Вы можете просмотреть статьи, отправленные Вам на проверку и вынести по ним решения.
		    </p>
		    <p>
		      В разделе <b>"Личные сообщения"</b> Вы можете вести переписку с другими пользователями системы.
		    </p>
		    <p>
		      В разделе <b>"Настройки"</b> Вы можете изменить свои данные для входа в личный кабинет и фотографию профиля.
		    </p>
		  </div>
		)
  }
}

export default MainContentEditorial